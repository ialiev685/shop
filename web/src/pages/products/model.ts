import type { LinkState } from "@/entities/navigation-crumbs";
import { productQueries } from "@/entities/product";
import { routesMap } from "@/app/routes";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useInfiniteScroll } from "@/shared/hooks/use-infinite-scroll";

export const useController = () => {
  const navigate = useNavigate();
  const { id } = useParams<string>();

  const location = useLocation();

  const { hasNextPage, isFetchingNextPage, fetchNextPage, data, isLoading } =
    useInfiniteQuery({
      ...productQueries.getByTypeInfinity(Number(id)),
      enabled: Boolean(id),
    });

  const { ref } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const handlePreview = (id: number, name: string) => {
    const to = generatePath(routesMap["/product-preview/:id"], {
      id: id.toString(),
    });
    navigate(to, { state: { title: name, to } as LinkState });
  };
  return {
    products: data?.pages.flatMap(({ data }) => data) ?? [],
    isLoading: isLoading,
    title: location.state?.title,
    handlePreview,
    loadMoreRef: ref,
    hasNextPage,
    isFetchingNextPage,
  };
};

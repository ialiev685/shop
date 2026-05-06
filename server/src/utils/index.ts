interface SwaggerPaths {
  paths: {
    [path: string]: {
      [method: string]: object;
    };
  };
}

class SwaggerAggregator {
  async loadMicroserviceSwagger(
    serviceUrl: string,
    proxyPrefix: string,
    originalPrefix = '/api/v1',
  ) {
    const url = `${serviceUrl}/swagger/json`;
    try {
      const response = await fetch(url);

      const swagger: SwaggerPaths = await response.json();
      const transformedPaths = this.transformPaths(swagger.paths, proxyPrefix, originalPrefix);

      return transformedPaths;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Ошибка загрузки Swagger из ${url}:`, error);
      }

      return undefined;
    }
  }

  private transformPaths(
    paths: SwaggerPaths['paths'],
    proxyPrefix: string,
    originalPrefix: string,
  ) {
    const transformed: Record<string, Record<string, object>> = {};

    for (const [path, methods] of Object.entries(paths)) {
      const newPath = path.replace(originalPrefix, proxyPrefix);

      transformed[newPath] = {};

      for (const [method, spec] of Object.entries(methods)) {
        transformed[newPath][method] = {
          ...spec,
        };
      }
    }

    return transformed;
  }
}

export const swaggerAggregator = new SwaggerAggregator();

export function createPaginatedResponse<T>({
  data,
  total,
  page,
  limit,
}: {
  data: T[];
  total: number;
  page: number;
  limit: number;
}) {
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}

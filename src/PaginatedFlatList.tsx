import React, { useCallback, useMemo } from "react";
import { FlatList, FlatListProps, ActivityIndicator, View } from "react-native";
import { PaginationState } from "./types";

export interface PaginatedFlatListProps<T>
  extends Omit<FlatListProps<T>, "onEndReached"> {
  pagination: PaginationState;
  isLoading: boolean;
  onLoadMore: () => void;

  LoaderComponent?: React.ReactNode;
  FooterComponent?: React.ReactNode;
  enableAutoFetch?: boolean;
}

export function PaginatedFlatList<T>({
  data,
  pagination,
  isLoading,
  onLoadMore,
  LoaderComponent,
  FooterComponent,
  enableAutoFetch = true,
  ...props
}: PaginatedFlatListProps<T>) {
  const safeData = data ?? [];

  const hasMore = useMemo(() => {
    if (pagination.totalPages !== undefined) {
      return pagination.page <= pagination.totalPages;
    }
    if (pagination.totalCount !== undefined) {
      return safeData.length < pagination.totalCount;
    }
    return true;
  }, [pagination, safeData.length]);

  const handleEndReached = useCallback(() => {
    if (!enableAutoFetch || isLoading || !hasMore) return;
    onLoadMore();
  }, [enableAutoFetch, isLoading, hasMore, onLoadMore]);

  const renderFooter = () => {
    if (!hasMore) return null;

    if (isLoading) {
      return (
        LoaderComponent ?? (
          <View style={{ paddingVertical: 16 }}>
            <ActivityIndicator />
          </View>
        )
      );
    }

    return FooterComponent ?? null;
  };

  return (
    <FlatList
      {...props}
      data={safeData}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.2}
      ListFooterComponent={renderFooter}
      contentContainerStyle={[
        { paddingBottom: 24 },
        props.contentContainerStyle,
      ]}
    />
  );
}

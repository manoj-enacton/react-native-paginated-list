import React, { useCallback, useMemo } from "react";
import { FlatList, ActivityIndicator, View } from "react-native";
export function PaginatedFlatList({ data, pagination, isLoading, onLoadMore, LoaderComponent, FooterComponent, enableAutoFetch = true, ...props }) {
    const safeData = data !== null && data !== void 0 ? data : [];
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
        if (!enableAutoFetch || isLoading || !hasMore)
            return;
        onLoadMore();
    }, [enableAutoFetch, isLoading, hasMore, onLoadMore]);
    const renderFooter = () => {
        if (!hasMore)
            return null;
        if (isLoading) {
            return (LoaderComponent !== null && LoaderComponent !== void 0 ? LoaderComponent : (<View style={{ paddingVertical: 16 }}>
            <ActivityIndicator />
          </View>));
        }
        return FooterComponent !== null && FooterComponent !== void 0 ? FooterComponent : null;
    };
    return (<FlatList {...props} data={safeData} onEndReached={handleEndReached} onEndReachedThreshold={0.2} ListFooterComponent={renderFooter} contentContainerStyle={[
            { paddingBottom: 24 },
            props.contentContainerStyle,
        ]}/>);
}

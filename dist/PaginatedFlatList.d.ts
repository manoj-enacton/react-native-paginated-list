import React from "react";
import { FlatListProps } from "react-native";
import { PaginationState } from "./types";
export interface PaginatedFlatListProps<T> extends Omit<FlatListProps<T>, "onEndReached"> {
    pagination: PaginationState;
    isLoading: boolean;
    onLoadMore: () => void;
    LoaderComponent?: React.ReactNode;
    FooterComponent?: React.ReactNode;
    enableAutoFetch?: boolean;
}
export declare function PaginatedFlatList<T>({ data, pagination, isLoading, onLoadMore, LoaderComponent, FooterComponent, enableAutoFetch, ...props }: PaginatedFlatListProps<T>): React.JSX.Element;

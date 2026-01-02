# react-native-paginated-list

Reusable paginated FlatList and pagination hook for React Native.

## Install

npm install react-native-paginated-list

## Usage

```tsx
const { data, pagination, isLoading, loadNextPage } =
  usePaginatedList(fetchUsers);

<PaginatedFlatList
  data={data}
  pagination={pagination}
  isLoading={isLoading}
  onLoadMore={loadNextPage}
  renderItem={renderItem}
/>;
```

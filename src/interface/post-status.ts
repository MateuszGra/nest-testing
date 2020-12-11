export type PostStatus = {
    isSuccess: true,
    id: number,
} | {
    isSuccess: false,
    errors: string[],
}
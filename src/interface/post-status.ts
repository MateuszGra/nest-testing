export type PostStatus = {
    isSuccess: true,
    index: number,
} | {
    isSuccess: false,
    errors: string[],
}
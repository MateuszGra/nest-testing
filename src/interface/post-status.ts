export type postStatus = {
    isSuccess: true,
    index: number,
} | {
    isSuccess: false,
    errors: string[],
}
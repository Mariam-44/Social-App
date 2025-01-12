export type postState = {
    posts:null | Post[],
    postDetails:null | Post
}

export interface PaginationInfo {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage: number;
    total: number;
}

export interface User {
    _id: string;
    name: string;
    photo: string;
}

export interface Comment {
    _id: string;
    content: string;
    commentCreator: User;
    post: string;
    createdAt: string; // ISO Date string
}

export interface Post {
    _id: string;
    body: string;
    image: string;
    user: User;
    createdAt: string; // ISO Date string
    comments: Comment[];
    id: string;
}

export interface ApiResponse {
    message: string;
    paginationInfo: PaginationInfo;
    posts: Post[];
}

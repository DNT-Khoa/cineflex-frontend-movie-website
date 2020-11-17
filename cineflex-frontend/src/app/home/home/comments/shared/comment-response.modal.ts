export class CommentResponseModal {
    id: number;
    content: string;
    commentDate: number;
    path: string;
    email: string;
    likedByUsers: {
        firstName: string,
        lastName: string,
        email: string,
        created: string
    }[];
}
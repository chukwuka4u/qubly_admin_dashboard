export interface QueueMember {
    _id: string,
    status: "waiting" | "serving" | "done",
    user_id?: string,
    position?: number
}
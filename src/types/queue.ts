export interface Queue {
    active: boolean,
    admin_id: string,
    current_capacity: number,
    queue_capacity: number,
    queue_name: string,
    sub_admin_id?: string,
    _id: string
    // created_at?: string,
}
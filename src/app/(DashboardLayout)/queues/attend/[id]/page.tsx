'use client';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import AttendQueue from '../../../components/attend/attend-queue';
import { useContext, useEffect, useState } from 'react';
import { attend_queue } from '@/lib/requests';
import { QueueMember } from '@/types/queue_member';

import { Subscription } from "@rails/actioncable";
import { CableContext } from '@/context/cable-context';


const AttendPage = ({ params }: { params: any }) => {
    const [queueMembers, setQueueMembers] = useState<QueueMember[]>([])
    const [id, setId] = useState<string>("")
    const [queueName, setQueueName] = useState<string>("")

    const consumer = useContext(CableContext)
    const [channel, setChannel] = useState<Subscription & { connected: () => void; disconnected: () => void; received: (data: unknown) => void; }>();
    // subscribe the queue pos_queue_{this queue id}


    useEffect(() => {
        (
            async function () {
                const param_obj = await Promise.resolve(params)
                const queueParams = new URLSearchParams(window.location.search);
                const queue_name = queueParams.get("queue_name")
                const result = await attend_queue(param_obj.id);
                console.log(queue_name)
                setId(param_obj.id)
                setQueueMembers(result.data)
                setQueueName(queue_name || "")
            }
        )()
    }, [])
    useEffect(() => {
        const newChannel = consumer!.cable.subscriptions.create({
            channel: 'PosQueueChannel',
            pos_queue_id: id
        },
            {
                connected: () => console.log("channel connected" + id),
                disconnected: () => console.log("channel disconnected"),
                received: (data) => { updateQueue(data) }
            });

        return () => {
            newChannel.unsubscribe();
        }
    }, [id])

    function updateQueue(data: { action: string, message: string }) {
        if (data.action == "leave")
            setQueueMembers(prev => prev.filter(m => m.user_id! !== data.message))
        else if (data.action == "join") {
            attend_queue(id)
                .then((result) => setQueueMembers(result.data))
        }
    }

    return (
        <PageContainer title="Queue Page" description="attending to queue">
            <AttendQueue memberList={queueMembers} setMemberList={setQueueMembers} queue_id={id} queueName={queueName} />
        </PageContainer>
    );
};

export default AttendPage;

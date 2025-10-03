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

    const consumer = useContext(CableContext)
    const [channel, setChannel] = useState<Subscription & { connected: () => void; disconnected: () => void; received: (data: unknown) => void; }>();
    // subscribe the queue pos_queue_{this queue id}

    useEffect(() => {
        (
            async function () {
                const param_obj = await Promise.resolve(params)
                const result = await attend_queue(param_obj.id);

                setId(param_obj.id)
                setQueueMembers(result.data)
            }
        )()
        const newChannel = consumer!.cable.subscriptions.create({
            channel: "ForumChannel",
            forum_id: "67a9aa930f1e3827e2b2db7f",
            user: "chukwuka"
        },
            {
                // send: (data: unknown) => console.log("sending data " + data),
                connected: () => console.log("channel connected"),
                disconnected: () => console.log("channel disconnected"),
                received: (data) => console.log(`received: ${data}`)
            });

        return () => {
            newChannel.unsubscribe();
        }
    }, [])
    return (
        <PageContainer title="Queue Page" description="attending to queue">
            <AttendQueue memberList={queueMembers} id={id} />
        </PageContainer>
    );
};

export default AttendPage;

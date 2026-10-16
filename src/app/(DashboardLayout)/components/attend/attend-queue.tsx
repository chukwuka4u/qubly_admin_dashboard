"use client"
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { start_next, completed } from "@/lib/requests"
import { QueueMember } from '@/types/queue_member';
import {
    Timeline,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
    timelineOppositeContentClasses,
} from '@mui/lab';
import { Button, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { Dispatch, SetStateAction, useState } from 'react';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation'

type buttonOptionsProps = "Start" | "Next" | "Finish"
type responseObj = {
    message: string
    queue_member?: QueueMember
}

const AttendQueue = ({ memberList, setMemberList, queue_id, queueName }: { memberList: QueueMember[] | string, setMemberList: Dispatch<SetStateAction<QueueMember[]>>, queue_id: string, queueName: string }) => {
    const [buttonOption, setButtonOption] = useState<buttonOptionsProps>("Start")
    const router = useRouter()
    const queue_action = async (id : string = queue_id) => {
        const list = memberList as QueueMember[]
        const servingMember = list.find(m => m.status === "serving")
        const updatedObj: responseObj = servingMember ? await completed(servingMember?._id, id) : setButtonOption("Next")

        const result: responseObj = await start_next(id)
        updateArray(updatedObj?.queue_member, result?.queue_member)
        if (result.message == "No waiting users found")
            setButtonOption("Finish")
        console.log(memberList)
    }
    const updateArray = (prev?: QueueMember, next?: QueueMember) => {
        const list = memberList as QueueMember[]
        if (prev) {
            const prevIndx = list.findIndex(obj => obj._id === prev!._id);
            if (prevIndx !== -1) {
                list[prevIndx] = prev!;
            }
        }
        else if (next) {
            const index = list.findIndex(obj => obj._id === next?._id);
            if (index !== -1) {
                list[index] = next!;
            }
        }
        setMemberList([...list])
    }

    return (
        <DashboardCard title={queueName} subtitle={`${memberList.length} person(s) in queue`} >

            <IconArrowLeft stroke={2} onClick={() => router.back()} />
            <>
                <Timeline
                    className="theme-timeline"
                    nonce={undefined}
                    onReset={undefined}
                    onResetCapture={undefined}
                    sx={{
                        p: 0,
                        mb: '-40px',
                        '& .MuiTimelineConnector-root': {
                            width: '1px',
                            backgroundColor: '#efefef'
                        },
                        [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.5,
                            paddingLeft: 0,
                        },
                    }}
                >
                    <TimelineItem>
                        <TimelineOppositeContent>
                            checkbox
                        </TimelineOppositeContent>
                        <TimelineOppositeContent>pos</TimelineOppositeContent>
                        <TimelineOppositeContent>status</TimelineOppositeContent>

                        <TimelineContent>customer</TimelineContent>
                    </TimelineItem>
                    {
                        typeof (memberList) === "string" ?
                            <Typography sx={{ textAlign: "center" }}>
                                {memberList}
                            </Typography>
                            :
                            memberList.map((v, i) =>
                                <TimelineItem key={i}>
                                    <TimelineOppositeContent>
                                        <Checkbox checked={v.status == "done"} disabled={v.status == "done"} />
                                    </TimelineOppositeContent>
                                    <TimelineOppositeContent>#{v.position}</TimelineOppositeContent>
                                    <TimelineOppositeContent>{v.status}</TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot color={v.status == "waiting" ? "primary" : (v.status == "serving" ? "success" : (v.status == "done" ? "grey" : "inherit"))} variant="outlined" />
                                        <TimelineConnector />
                                    </TimelineSeparator>

                                    <TimelineContent>{v.user_id}</TimelineContent>
                                </TimelineItem>
                            )
                    }
                </Timeline>
                <Button variant="contained" component={Button} onClick={async () => await queue_action(queue_id)} disableElevation color="primary" sx={{
                    position: "fixed",
                    top: "50%",
                }}
                    disabled={buttonOption == "Finish"}
                    >
                    {buttonOption}
                </Button>
            </>
        </DashboardCard>
    );
};

export default AttendQueue;
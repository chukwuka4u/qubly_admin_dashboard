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
import { useState } from 'react';

type buttonOptionsProps = "Start" | "Next" | "Finish"

const AttendQueue = ({ memberList, id }: { memberList: QueueMember[] | string, id: string }) => {
    console.log(memberList)
    const [buttonOption, setButtonOption] = useState<buttonOptionsProps>("Start")
    const [servingMember, setServingMember] = useState<QueueMember | null>(null)

    const queue_action = async (id: string) => {
        const comp = servingMember ? await completed(servingMember?._id, id) : setButtonOption("Next")
        console.log(comp)
        const result = await start_next(id)
        console.log(result)
        //result should be the current "serving"
        setServingMember(result.queue_member as QueueMember)
        updateArray()
    }
    const updateArray = () => {
        const index = (memberList as QueueMember[]).findIndex(obj => obj._id === servingMember!._id);
        if (index !== -1) {
            (memberList as QueueMember[])[index] = servingMember!;
        }
    }

    return (
        <DashboardCard title={"attending to queue #" + id}>
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
                    {
                        typeof (memberList) === "string" ?
                            <Typography sx={{ textAlign: "center" }}>
                                {memberList}
                            </Typography>
                            :
                            memberList.map((v, i) =>
                                <TimelineItem key={i}>
                                    <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot color={v.status == "waiting" ? "primary" : (v.status == "serving" ? "success" : (v.status == "done" ? "grey" : "inherit"))} variant="outlined" />
                                        <TimelineConnector />
                                    </TimelineSeparator>

                                    <TimelineContent> <span style={{ marginRight: 100, marginLeft: 100 }}>{v.position}</span>Payment received from John Doe of $385.90</TimelineContent>
                                </TimelineItem>
                            )
                    }
                </Timeline>
                <Button variant="contained" component={Button} onClick={async () => await queue_action(id)} disableElevation color="primary" sx={{
                    position: "fixed",
                    top: "50%",
                }}>
                    {buttonOption}
                </Button>
            </>
        </DashboardCard>
    );
};

export default AttendQueue;
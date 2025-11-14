import * as React from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import Link from "next/link"
import { delete_queue } from "@/lib/requests"
import { useRouter } from "next/navigation"

export default function QueueCard(props: any) {
    const theme = useTheme();
    const router = useRouter();
    const cardAct = [
        {
            tag: "delete",
            handleClick: async () => {
                const result = await delete_queue(props.q._id)
                router.push("/queues")
            }
        }
    ]

    return (
        <Card sx={{ display: 'flex', width: '60%', justifyContent: 'space-between' }}>
            <Link href={'/queues/attend/' + props.q._id}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            {props.q.queue_name}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ color: 'text.secondary' }}
                        >
                            #{props.q._id}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ color: 'text.secondary', fontSize: 12, marginTop: 2 }}
                        >
                            Created:{props.q.created_at}
                        </Typography>
                    </CardContent>
                </Box>
            </Link>
            <Select sx={{ height: 15, width: 20 }}>
                {cardAct.map((v, i) =>
                    <MenuItem key={i} onClick={v.handleClick}>
                        {v.tag}
                    </MenuItem>
                )}
            </Select>
        </Card>
    );
}

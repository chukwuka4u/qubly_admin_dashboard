import * as React from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { IconCaretDownFilled } from '@tabler/icons-react';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { get_admin_pos_queues } from '@/lib/requests';

export default function QueueCard(props: any) {
    const theme = useTheme();
    const cardAct = [
        "delete", "add breaks", "settings"
    ]

    return (
        <Card sx={{ display: 'flex', width: '60%', justifyContent: 'space-between' }}>
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
                {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous">
                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    <IconButton aria-label="play/pause">
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                </Box> */}
            </Box>
            <Select sx={{ height: 15, width: 20 }}>
                {cardAct.map((v, i) =>
                    <MenuItem key={i}>
                        {v}
                    </MenuItem>
                )}
            </Select>
        </Card>
    );
}

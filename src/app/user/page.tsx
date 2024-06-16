'use client'
import { AuthRegisterProfile } from '@/components/auth/AuthRegisterProfile';
import FloatingCard from '@/components/FloatingCard/FloatingCard';
import { Stack } from '@mui/material';
import { useSession } from 'next-auth/react';

export default function Home() {
    const { data: session } = useSession();
    return (
        <Stack direction={'row'} spacing={2}>
            <AuthRegisterProfile />
            <FloatingCard imageurl={session?.user?.image} />
        </Stack>
    );
}
'use client'
import { Card, styled } from '@mui/material'

export const CardGlass = styled(Card)(({ theme }) => ({
    backgroundColor: 'rgba(256,256,256,.2)',
    boxShadow: '0 0 10px rgba(256,256,256,.12)',
    WebkitBackdropFilter: 'blur(10px)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    marginTop: '0.625em',
    marginLeft: '0px',
    marginRight: '0px',
    paddingTop: '0.8125em',
    paddingLeft: '1.5625em',
    paddingRight: '1.5625em',
    paddingBottom: '0.625em',
}));

export const Glass = styled(Card)(({ theme }) => ({
    backgroundColor: 'rgba(256,256,256,.2)',
    boxShadow: '0 0 10px rgba(256,256,256,.12)',
    WebkitBackdropFilter: 'blur(10px)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    overflow: 'auto',
    //height: '92vh',
    border: '0.0625em solid rgba(255, 255, 255, 0.18)',
}));
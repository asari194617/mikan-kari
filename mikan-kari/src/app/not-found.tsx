// src/app/not-found.tsx
import React from 'react';
import { NextPage } from 'next';
import Image from "next/image";
import Errorpage from '@/components/Errorpage';

const NotFound: NextPage = () => {
    return (
        <Errorpage code="404" />
    );
};

export default NotFound;

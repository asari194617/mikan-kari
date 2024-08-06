// src/app/Errorpage.tsx
import React from 'react';
import { NextPage } from 'next';
import "./Errorpage.css";
import Image from "next/image";
import fs from 'fs';
import ErrorCodeList from './error_response_code.json';

interface ErrorCode {
    name: string;
    message: string;
    sub?: string; // subプロパティをオプションにする
}

interface CustomButtonProps {
    code: string; // エラーコード(必須)
    name?: string; // サブテキスト(任意)
    message?: string; // エラーメッセージ(任意)
    sub?: string; // エラーメッセージ(任意)
}

const Errorpage: React.FC<CustomButtonProps> = ({ code, name="", message="", sub="" }) => {
    const error = (ErrorCodeList as Record<string, ErrorCode>)[code];
    let error_name = error.name;
    let error_message = error.message;
    let error_sub = error.sub;
    if (name !== "") {
        error_name = name;
    }
    if (message !== "") {
        error_message = message;
    }
    if (sub !== "") {
        error_sub = sub;
    }

    return (
        <div>
            <div id="body-404">
                <div id="center">
                    <div id="content-404">
                        <div>
                            <Image src="/images/404.svg" alt="404" id="img-error" width={23} height={23} />
                            <div>
                                <h3>{code} : {error_name}</h3>
                                <h1>{error_message}</h1>
                                <p>{error_sub}</p>
                                <a href="/">トップページへ</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Errorpage;

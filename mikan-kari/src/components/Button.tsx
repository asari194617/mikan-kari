import React from 'react';
import Link from 'next/link';
import './button.css';

interface CustomButtonProps {
    text: string; // ボタンのテキスト
    bg?: string; // ボタンの背景色
    border?: string; // ボタンのボーダー
    height?: string; // ボタンの高さ
    type?: string; // ボタンのタイプ
    href?: string; // ボタンのリンク先
    onclick?: () => void; // ボタンクリック時の処理
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, bg="", border="", height="unset", type="", href="", onclick }) => {
    if (border !== "") {
        height = ("calc(100% - " + border.split(" ")[1] + "* 2)");
    }

    if (type !== "") {
        type = (type + "-button");
    }
    
    return (
        <div>
            <Link href={href} className={['button', 'border-2','border-solid',  `${type}`].join(' ')} style={{background: bg, border: border, height: height}} onClick={onclick}>
                {text}
            </Link>
        </div>

    );
}

export default CustomButton;

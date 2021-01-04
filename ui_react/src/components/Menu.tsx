import React, { useState, useEffect } from 'react';

type itsProps = {
    isShow: boolean;
    onCancel: ()=>void;
    onMenuSelected: (menu: number)=>void;
};

const Menu = (props: itsProps) => {
    const { isShow, onCancel, onMenuSelected } = props;

    const onMenuClick = (e: React.MouseEvent<HTMLLIElement,MouseEvent>, menu: number) => {
        onMenuSelected(menu);
    }

    const handleCancel = () => {
        onCancel();
    }

    if ( !isShow ) return null;

    return (
        <div className="menu" onClick={ handleCancel }>
            <div>
                <ul>
                    <li onClick={ e => onMenuClick(e,1) }>予約</li>
                    <li onClick={ e => onMenuClick(e,2) }>顧客マスタ</li>
                    <li onClick={ e => onMenuClick(e,3) }>施設マスタ</li>
                </ul>
            </div>
        </div>
    );

}

export default Menu;
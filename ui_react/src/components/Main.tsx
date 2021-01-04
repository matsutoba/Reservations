import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import { useQuery, useIsFetching } from 'react-query';
import Header from './Header';
import Menu from './Menu';
import Reservation from './reservation/Reservation';
import Facility from './facility/Facility';
import Customer from './customer/Customer';
import { MenuEnum } from '../types/Const';

const Main = () => {
    const isFetching = useIsFetching();

    const [currentMenu, setCurrentMenu] = useState(MenuEnum.Reservation);
    const [isShowMenu, setShowMenu] = useState(false);
    const handleMenuCancel = () => {
        setShowMenu(!isShowMenu);
    }
    const handleMenuSelected = (num: number) => {
        setCurrentMenu(num);
    }

    return (
        <section className='main'>
            <Header handleMenuIcon={handleMenuCancel}>
                <Menu isShow={isShowMenu} onCancel={handleMenuCancel} onMenuSelected={handleMenuSelected} />
            </Header>
            <div className='body'>
            {(()=>{
                if ( isFetching ) {
                    return ( 
                        <div className="loader-bg">
                            <div className="loader">Loading...</div>
                        </div>
                    )
                }
            })()}
                <div className='content'>
                    {(()=>{
                        switch (currentMenu) {
                            case MenuEnum.Reservation:
                                return <Reservation/>
                            case MenuEnum.Customer:
                                return <Customer/>
                            case MenuEnum.Facility:
                                return <Facility />
                            default:
                                return <></>
                        }
                    })()}

                </div>
            </div>
        </section>
    );
}

export default withRouter(Main);
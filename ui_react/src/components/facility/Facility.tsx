import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import EditFacility from './EditFacility';
import ListFacilities from './ListFacilities';

enum ScreenMode {
    List = 0,
    Edit = 1,
}

const Facility = () => {
    const [mode, setMode] = useState(ScreenMode.List);
    const [facilityId, setFacilityId] = useState(-1);

    const handleDetail = (id: number) => {
        setFacilityId(id);
        setMode(ScreenMode.Edit);
    }

    const handleScreenMode = (mode: ScreenMode) => {
        setMode(mode);
    }

    return (
        <div className='content'>

            <div className='reservations'>
                <h2>施設マスタ</h2>
                {(()=>{
                    switch (mode) {
                        case ScreenMode.List:
                            return <ListFacilities
                                handleDetail={ handleDetail }
                                handleScreenMode={() => handleScreenMode(ScreenMode.Edit)} 
                            />;
                        case ScreenMode.Edit:
                            return <EditFacility facilityId={facilityId}
                            handleScreenMode={() => handleScreenMode(ScreenMode.List)} 
                            />;
                        default:
                            return <></>
                    }
                })()}
            </div>
        </div>
    );
}

export default Facility;
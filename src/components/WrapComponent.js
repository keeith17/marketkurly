import React, { useState } from 'react';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import MainComponent from './MainComponent';
import ModalComponent from './ModalComponent';

const WrapComponent = () => {
    //모달 상태관리
    const [modal, setModal] = useState(
        {
            isShow:false,
            title:'모달 테스트 타이틀'
        }
    );
    const modalCloseFn=()=>{
        setModal({...modal, isShow:false});
    }
    const modalOpenFn=(tit)=>{
        setModal({...modal, isShow:true, title:tit});
    }
    return (
        <div id="wrap"> 
            <HeaderComponent />
            <MainComponent modalOpenFn={modalOpenFn} />
            <FooterComponent />
            <ModalComponent modal={modal} modalCloseFn={modalCloseFn} />
        </div>
    );
};

export default WrapComponent;
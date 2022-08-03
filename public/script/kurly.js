(function(){

    var chkboxBtn = $('.chkbox-btn');
    
    //마우스 올리면 가이드 텍스트 보이기
    $('#inputId').on({
        mousedown: function(){
            $('.guide-id').show();
        }
    });

    var idok = false
    //아이디 정규표현식
    $('#inputId').on({
        keyup: function(event){
            event.preventDefault();

            //6자 이상의 영문(필수) 또는 숫자와 조합(선택)
            // var regExp = /(?=.*([A-Za-z]+[0-9]*)[A-Za-z0-9]{6,})/;
            var regExp = /^(((?=.*[A-Za-z])+(?=.*[0-9])*)[^가-힣ㄱ-ㅎㅏ-ㅣ!@#$%^&*\(\)-_\=\+\\\{\}\[\]\?\/\.\,\>\<\~\`\:\;\'\"])[^\s][A-Za-z0-9]{6,}$/g;
            var idValue = $(this).val().toString();
                
                if(idValue===''){
                    $('.guide-id p').eq(0).removeClass('error');
                    $('.guide-id p').eq(0).removeClass('success');
                    $('.guide-id p').eq(1).removeClass('error');
                    $('.guide-id p').eq(1).removeClass('success');
                    idok = false;
                }
                else{
                    if( regExp.test(idValue) ) {
                        $('.guide-id p').eq(0).removeClass('error');
                        $('.guide-id p').eq(0).addClass('success');
                        idok = true;
                    }
                    else{
                        $('.guide-id p').eq(0).removeClass('success');
                        $('.guide-id p').eq(0).addClass('error');
                        idok = false;
                    }
                }

        }
    });

    //아이디 모달
    $('.id-double-btn').on({
        click: function(e){
            e.preventDefault();
            var regExp = /^(((?=.*[A-Za-z])+(?=.*[0-9])*)+([^가-힣ㄱ-ㅎㅏ-ㅣ!@#$%^&*\(\)-_\=\+\\\{\}\[\]\?\/\.\,\>\<\~\`\:\;\'\"]))[^\s][A-Za-z0-9]{6,}$/g;
            var idValue = $('#inputId').val().toString();
            
            if(idValue===''){
                modal('아이디를 입력해 주세요');
            }
            else{
                if( regExp.test(idValue) ) {
                    idDoubleCheck();
                }
                else{
                    modal('아이디는 6자 이상의 영문 혹은 영문과 숫자 조합만 가능합니다');
                }
            }
        }
    })

    //아이디 중복체크 함수
    function idDoubleCheck(){
        //아이디 중복을 체크한다
        //1 아이디 입력값
        var inputId = $('#inputId').val();
        console.log('입력된 글자', inputId );
        var ok = false; //중복확인변수
        //2 로컬스토리지에 저장된 데이터(데이터베이스) 가져오기
        for(let i=0; i<localStorage.length; i++){
            //console.log( localStorage.key(i) ); //key 가져오기
            //console.log( localStorage.getItem(localStorage.key(i)) ); //value 가져오기
            //console.log( JSON.parse(localStorage.getItem(localStorage.key(i))).아이디 ); //JSON 객체로 변환
            if(JSON.parse(localStorage.getItem(localStorage.key(i))).아이디===inputId){
                ok = true;  //중복이다
            }
        }
        //반복비교가 끝나고 결과를 가지고 안내 출력
        if(ok===true){
            alert('이미 등록된 아이디입니다.');
            $('.guide-id p').eq(1).addClass('error');
            $('.guide-id p').eq(1).removeClass('success');
        }
        else{
            alert('사용 가능한 아이디입니다.');
            $('.guide-id p').eq(1).removeClass('error');
            $('.guide-id p').eq(1).addClass('success');
        }
        //3 가져온 데이터를 아이디만 추출하기
        //4 반복 비교하기 $('#inputId').val() === 로컬스토리지.아이디    
        //4-1 같다면 - 이미 등록된 아이디입니다, 빨강 알림창 띄우기
        //4-2 다르면 - 사용 가능한 아이디입니다, 초록 알림창 띄우기
        
    }


    //비밀번호
    //마우스 올리면 가이드 텍스트 보이기
    $('#inputPw').on({
        mousedown: function(){
            $('.guide-pw').show();
        }
    });
    var pwok1 = false;
    var pwok2 = false;
    var pwok3 = false;
    //비밀번호 정규표현식
    $('#inputPw').on({
        keyup: function(e){
            e.preventDefault();
            var pwValue = $(this).val().toString();

            //1 10자 이상
            var regExp1 = /.{10,}/;
            if(pwValue===''){
                $('.guide-pw p').eq(0).removeClass('error');
                $('.guide-pw p').eq(0).removeClass('success');
            }
            else{
                if(regExp1.test(pwValue)){
                    $('.guide-pw p').eq(0).removeClass('error');
                    $('.guide-pw p').eq(0).addClass('success');
                    pwok1 = true;
                }
                else{
                    $('.guide-pw p').eq(0).removeClass('success');
                    $('.guide-pw p').eq(0).addClass('error');
                }
            }

            //2 영문 필수 + 숫자나 특수문자중 하나 필수
            var regExp2 = /((?=.*[A-Za-z])+((?=.*[0-9])+|(?=.*[!@#$%&*_-])+)+)[^\s][A-Za-z0-9!@#$%^&_-]{9,}/;
            if(pwValue===''){
                $('.guide-pw p').eq(1).removeClass('error');
                $('.guide-pw p').eq(1).removeClass('success');
            }
            else{
                if(regExp2.test(pwValue)){
                    $('.guide-pw p').eq(1).removeClass('error');
                    $('.guide-pw p').eq(1).addClass('success');
                    pwok2 = true;
                }
                else{
                    $('.guide-pw p').eq(1).removeClass('success');
                    $('.guide-pw p').eq(1).addClass('error');
                }
            }

            
            
            
            
            
            
            //3 같은 숫자 세 개 연속 불가능
            var regExp3 = /(.)\1\1/; //긍정문이라 true가 error인 것

            if(pwValue===''){
                $('.guide-pw p').eq(2).removeClass('error');
                $('.guide-pw p').eq(2).removeClass('success');
            }
            else{
                if(regExp3.test(pwValue)){
                    $('.guide-pw p').eq(2).addClass('error');
                    $('.guide-pw p').eq(2).removeClass('success');
                }
                else{
                    $('.guide-pw p').eq(2).addClass('success');
                    $('.guide-pw p').eq(2).removeClass('error');
                    pwok3 = true;
                }
            }
        }

    });

    $('#inputName').on({
        keyup: function(){

            $(this).val( $(this).val().toString().replace(/[^A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ\s]/g,'') )

        }

    });

    var pwckok = false;
    //비밀번호 확인
    $('#inputPwChk').on({
        mousedown: function(){
            $('.guide-pw-check').show();
        }
    });

    $('#inputPwChk').on({
        keyup: function(){
            if( $('#inputPwChk').val()===''){
                $('.guide-pw-check p').removeClass('error');
                $('.guide-pw-check p').removeClass('success');
            }
            else if( $('#inputPw').val() === $('#inputPwChk').val() ){
                $('.guide-pw-check p').removeClass('error');
                $('.guide-pw-check p').addClass('success');
                pwckok = true;
            }
            else{
                $('.guide-pw-check p').addClass('error');
                $('.guide-pw-check p').removeClass('success');
            }
        }
    });
    
    var emailok = false;
    //이메일 중복체크 함수
    function emailDoubleCheck(){
        //1 이메일 입력 데이터
        //2 저장된 로컬스토리지(데이터) 가져오기
        //3 가져온 데이터에서 이메일 추출
        //4 저장된 변수 값 비교 중복체크 경고창 띄우기

        var inputEmail = $('#inputEmail').val();
        var ok = false;

            for(let i=0; i<localStorage.length; i++){
                if (JSON.parse(localStorage.getItem( localStorage.key(i))).이메일 === inputEmail ){
                    ok=true;
                }
            }
            console.log(ok);
            if(ok===true){
                alert('중복된 이메일입니다.');
                emailok = false;
            }
            else{
                alert('사용 가능한 이메일입니다.');
                emailok = true;
            }
    }



    //이메일 모달
    $('.email-double-btn').on({
        click: function(e){
            e.preventDefault();

            var regExpEmail = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*.[A-Za-z]{2,3}$/;
            var emailValue = $('#inputEmail').val();

            if(emailValue==''){
                modal('이메일 주소를 입력해 주세요');
            }
            else{
                if(regExpEmail.test(emailValue) === false){
                    modal('잘못된 이메일 형식입니다');
                }
                else{
                    //이메일 중복 체크 함수 호출 실행
                    emailDoubleCheck();
                }
            }
        }


    });

    //이메일
    $('#inputEmail').on({
        keyup: function(e){
            e.preventDefault();
            //이메일 정규표현식
            var regExpEmail = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*.[A-Za-z]{2,3}$/;
            var emailValue = $(this).val().toString();

            //입력 완료 후 엔터 키 점검
            if(e.keyCode===13){
                if(regExpEmail.test(emailValue) === false){
                    $(this).addClass('error');
                    $(this).focus();
                }
            }
            else{
                $(this).removeClass('error');
            }

        }


    });

    
    //전화번호 인풋 색깔 + 모달 창 - 정규표현식 true false에 따라서
    $('.phone-btn').eq(0).on({
        click: function(e){
            e.preventDefault();

            var phoneValue = $('#inputPhone').val();
            var regExp2 = /^01[0|6|7|8|9]+\d{3,4}\d{4}$/;

            if(phoneValue.length < 10){
                return false;
            }
            else{
                if(regExp2.test(phoneValue)===false){
                    $('#inputPhone').addClass('error');
                    modal('잘못된 휴대전화 번호 입니다. 확인 후 다시 시도 해 주세요.');
                }
                else{
                    $('#inputPhone').removeClass('error');
                    $('.phone-ok-btn, #inputPhoneok, .count-timer').show();
                    modal('인증번호가 발송되었습니다.');

                    //카운트 타이머 함수 호출 실행
                    countTimer();

                }
            }
        }
    });
    
    //카운트타이머 함수
    var setId = 0;

    function countTimer(){
        //타이머는 3분
        var seconds = 60;
        var minutes = 2;
            setId = setInterval(function(){
                seconds--; //초
                if(seconds<0){
                    minutes--; //분
                    seconds=59; //초 초기화
                    if(minutes<0){
                        clearInterval(setId);
                        $('#inputPhoneok, .phone-ok-btn').prop('disabled', true);
                        $('#inputPhoneok, .phone-ok-btn').addClass('ok');
                        modal('인증 제한 시간이 지났습니다.');
                        $('.count-timer').html('');
                        return;
                    }
                }
                $('.count-timer').html( minutes + ':' + (seconds<10?'0'+seconds:seconds) );
            }, 500);
    }
    var phoneok = false;
    //인증번호 확인 버튼 클릭 이벤트
    $('.phone-btn').eq(1).on({
        click: function(e){
            e.preventDefault();
            var okkey = '123456';
            if( $('#inputPhoneok').val()===okkey ){
                phoneok = true;
                modal('인증이 확인되었습니다.');
                clearInterval(setId);
                $('#inputPhoneok, .phone-ok-btn').prop('disabled', true);
                $('#inputPhoneok, .phone-ok-btn').addClass('ok');
                $('#inputPhoneok').val('');
                $('.count-timer').html('');
            }
            else{
                modal('인증을 다시 한번 시도해 주세요.');
                return;
            }
        }
    });


    //전화번호 버튼 색깔 - 입력값 길이에 따라서
    $('#inputPhone').on({
        keyup: function(e){
            var phoneValue = $(this).val();
            var regExp1 = /[^0-9]/; //숫자가 아닌 것 판별 그리고 삭제
            var regExp2 = /^01[0|6|7|8|9]+\d{3,4}\d{4}$/;

            //입력값 문자열 .replace(정규표현식, 바꿀 문자 );
              
            $(this).val( phoneValue.replace(regExp1,'') );

            if(phoneValue.length === 0){
                $(this).removeClass('error');
            }
            else{
                if(phoneValue.length >= 10){
                    $('.phone-btn').addClass('on');
                }
                else{
                    $('.phone-btn').removeClass('on');
                }
            }
        }
    });






    //주소검색 버튼 클릭 이벤트
    $('#addressBtn').on({
        click: function(e){
            e.preventDefault();
            $('.address input').show();

            new daum.Postcode({
                oncomplete: function(data) {
                    // console.log(data);
                    // console.log(data.zonecode);
                    // console.log(data.roadAddress);
                    // console.log(data.jibunAddress);
                    $('#inputAddress1').val(`${data.zonecode}, ${data.roadAddress}`)
                    $('#inputAddress2').focus(); //입력대기

                    $('#addressBtn').removeClass('address-btn');
                    $('#addressBtn i').text('재검색');

                    var adr = $('#inputAddress1').val();
                    if( adr.indexOf('서울') >= 0 || adr.indexOf('경기') >= 0 ){
                        $('.guide-address').addClass('on');
                        $('.guide-address h4').text('샛별배송');
                        $('.guide-address h4').removeClass('no');
                    }
                    else if( adr.indexOf('제주') >= 0 || adr.indexOf('울릉')>= 0){
                        $('.guide-address').addClass('on');
                        $('.guide-address h4').text('배송불가');
                        $('.guide-address h4').addClass('no');
                    }
                    else {
                        $('.guide-address').addClass('on');
                        $('.guide-address h4').text('택배배송');
                        $('.guide-address h4').removeClass('no');
                    }

                }
            }).open();

        }
    });


    //성별



    //////////////////////////////////////////////////////////////////////////////////////
    // 생년월일 구현 알고리즘
    //////////////////////////////////////////////////////////////////////////////////////
    
    
    //날짜(일): 월별 마지막 날 체크

    // console.log( new Date() );
    // console.log( new Date().getFullYear() ); //1900~
    // console.log( new Date().getMonth()+1 ); //0~11
    // console.log( new Date().getDate() ); //1~31
    // console.log( new Date().getDay() ); //0~6 일요일이 0

    //월체크

    // var y = new Date().getFullYear();
    // var m = new Date().getMonth()+1; //4 -> 5월
    // var d = new Date().getDate();

    // console.log( new Date(y, m, 0).getDate() ); //월 마지막 날

    // if(new Date().getDay()===0){
    //     console.log('일요일');
    // }
    // else if(new Date().getDay()===1){
    //     console.log('월요일');
    // }
    // else if(new Date().getDay()===2){
    //     console.log('화요일');
    // }
    // else if(new Date().getDay()===3){
    //     console.log('수요일');
    // }
    // else if(new Date().getDay()===4){
    //     console.log('목요일');
    // }
    // else if(new Date().getDay()===5){
    //     console.log('금요일');
    // }
    // else if(new Date().getDay()===6){
    //     console.log('토요일');
    // }











    //생년월일 가이드 텍스트
    //입력상자 포커스 이벤트
    // 년    만 14세 미만은 가입이 불가합니다  -> 일 입력상자 떠나면 발생 나이계산
    // 월    태어난 월을 정확하게 입력하세요   -> 월 입력상자에 포커스 발생하면 보인다
    // 일    태어난 일을 정확하게 입력하세요   -> 일 입력상자에 포커스 발생하면 보인다
    // 일    포커스 아웃 되면 년도를 체크하여 14세 미만과 미래의 년도를 구분하는 프로그래밍
    // 모두 정상 데이터로 채워지면 모든 가이드 텍스트 사라진다
    
    // 가이드 텍스트 
    // 년월일이 모두 비어 있으면 아래 이벤트 시행 안 함
    // <p class="error">태어난 월을 정확하게 입력하세요</p> -> [1-12] 년도가 채워진 상태에서 월에서 포커스 아웃 하면 발생

    // <p class="error">태어난 일을 정확하게 입력하세요</p> -> [1-31] 년도와 월이 채워진 상태에서 일 포커스 아웃 하면 발생

    // <p class="error">태어난 년도 4자리를 정확하게 입력해주세요</p> -> 년도가 비어 있으면 월이 입력된 상태에서 월 포커스 아웃일 때
    // <p class="error">만 14세 미만은 가입이 불가합니다</p> -> 일 포커스 아웃 하면 체크

    //생년월일 입력값 숫자 아니면 모두 제거하는 함수
    function inputBoxRegExpCheck(value){
        var regExp = /[^0-9]/g;
        return value.trim().replace(regExp,'');
    }

    //생년월일체크함수
    function birthdayCheck(value){
        //현재 년월일 데이터
        var nowYear = new Date().getFullYear(); //년 4자리
        var nowMonth = new Date().getMonth()+1; //월 0~11
        var nowDate = new Date().getDate(); //일

        //현재년월일
        var today = new Date(nowYear, nowMonth, nowDate);


        //생년월일 데이터
        var year  = $('#year').val().trim().toString();
        var month = $('#month').val().trim().toString();
        var date  = $('#date').val().trim().toString();

        var birthLastDate = new Date(year, month, 0); //생년월일 말일
        


        // console.log('1월', new Date(2022, 1, 0) );
        // console.log('2월', new Date(2022, 2, 0) );
        // console.log('3월', new Date(2022, 3, 0) );
        // console.log('4월', new Date(2022, 4, 0) );
        // console.log('5월', new Date(2022, 5, 0) );
        // console.log('6월', new Date(2022, 6, 0) );
        // console.log('7월', new Date(2022, 7, 0) );
        // console.log('8월', new Date(2022, 8, 0) );
        // console.log('9월', new Date(2022, 9, 0) );
        // console.log('10월', new Date(2022, 10, 0) );
        // console.log('11월', new Date(2022, 11, 0) );
        // console.log('12월', new Date(2022, 12, 0) );

        //1. 년, 월, 일 비어 있으면 아무 이벤트도 안 한다
        if( $('#year').val()==='' && $('#month').val()==='' && $('#date').val()==='' ){
            return;
        }
        else{
            //year
            if(!/^(?:19[0-9][0-9]|2[0-9][0-9][0-9])$/g.test(year)){ //가이드텍스트 보이기(show)
                $('.guide-birthday-confirm p').show().text('태어난 년도 4자리를 정확하게 입력해주세요');
                return;
            }
            else{ //가이드텍스트 숨기기
                $('.guide-birthday-confirm p').hide();

                //month
                if(!/^(?:0?[1-9]|1[0-2])$/g.test(month)){ //가이드텍스트 보이기(show)
                    $('.guide-birthday-confirm p').show().text('태어난 월을 정확하게 입력하세요');
                    return;
                }
                else{ //가이드텍스트 숨기기
                    $('.guide-birthday-confirm p').hide();

                    //date
                    //추가항목: 태어난 월의 말일을 찾아서 본인의 생일의 날짜와 비교
                    //생일이 크면 잘못 입력된 날짜
                    // console.log(date);
                    // console.log(birthLastDate.getFullYear()); //년
                    // console.log(birthLastDate.getMonth()+1); //월
                    // console.log(birthLastDate.getDate()); //마지막 날(일)
                    if(!/^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g.test(date) || date > birthLastDate.getDate()){ //가이드텍스트 보이기(show)
                        $('.guide-birthday-confirm p').show().text('태어난 일을 정확하게 입력하세요');
                        return;
                    }
                    else{ //가이드텍스트 숨기기
                        $('.guide-birthday-confirm p').hide();
                        //날짜까지 모두 정상이면 

                        //14세 미만
                        //현재년도의 년,월,일
                        const nowYear120 = new Date(nowYear-120, nowMonth, nowDate);
                        const nowYear14 = new Date(nowYear-14, nowMonth, nowDate); //14세 미만 변수
                        const birthDay = new Date(year, month, date); //생년월일


    
                        //생년월일 모두 입력된 후에 처리할 내용 3 가지

                        //미래
                        if( birthDay > today ) {
                            $('.guide-birthday-confirm p').show().text('생년월일이 미래로 입력되었어요.');
                            return;    
                        }
                        else {
                            $('.guide-birthday-confirm p').hide();
                        }

                        //14세 미만 체크 확인
                        //console.log (nowYear14);
                        //console.log (birthDay);

                        if( birthDay > nowYear14 ){
                            $('.guide-birthday-confirm p').show().text('만 14세 미만은 가입이 불가합니다.');
                            return;    
                        }
                        else{
                            $('.guide-birthday-confirm p').hide();
                        }

                        // 120세 초과

                        if (birthDay < nowYear120 ){
                            $('.guide-birthday-confirm p').show().text('생년월일을 다시한번 확인해주세요');
                            return;
                        }
                        else {
                            $('.guide-birthday-confirm p').hide();
                        }

                        
                    }
                }    
            }
        }
    }
  

    // 년도 입력상자 이벤트 : keyup, focusin, focusout
    $('#year').on({
        keyup: function(){
            $(this).val(inputBoxRegExpCheck($(this).val()));
        },
        focusout: function(){
            birthdayCheck();
        }
    });


    // 월 입력상자 이벤트
    $('#month').on({
        keyup: function(){
            $(this).val(inputBoxRegExpCheck($(this).val()));
        },
        focusout: function(){
            birthdayCheck();
        },
        focusin: function(){
            birthdayCheck();
        }
    });



    // 일 입력상자 이벤트
    $('#date').on({
        keyup: function(){
            $(this).val(inputBoxRegExpCheck($(this).val()));
        },
        focusout: function(){
            birthdayCheck();
        },
        focusin: function(){
            birthdayCheck();
        }
    });







    //////////////////////////////////////////////////////////////////////////////////////
    // 생년월일 구현 알고리즘 끝
    //////////////////////////////////////////////////////////////////////////////////////

    

    //생년의 키보드가 입력이 되면
    //숫자가 아니면 모두 삭제하고
    //숫자만 년도를 4자리로 입력한다
    // $('#year').on({
    //     keyup: function(){
    //       var regExp1 = /[^0-9]/g;  //숫자가 아닌것
    //       var yearValue = $(this).val().toString().trim(); //문자열로 변환하고 양쪽 공백을 제거한다.
  
    //           $(this).val(  yearValue.replace(regExp1, '') ); //숫자가 아니면 무조건 공백으로 삭제
  
    //     }
    // });
  
    // //월
    // $('#month').on({
    //     keyup: function(){
    //       var regExp1 = /[^0-9]/g;  //숫자가 아닌것
    //       var yearValue = $(this).val().toString().trim(); //문자열로 변환하고 양쪽 공백을 제거한다.
  
    //           $(this).val(  yearValue.replace(regExp1, '') ); //숫자가 아니면 무조건 공백으로 삭제            
    //     },
    //     focusin: function(){
  
    //         if( $(this).val()!=='' ){ //값이 채워져 있으면 사라진다.
    //           $('.guide-birthday-confirm p').eq(1).hide();
    //         }
    //         else{
    //           $('.guide-birthday-confirm p').eq(1).show();
    //         }
  
    //     },
    //     focusout: function(){
  
    //       if( $(this).val()!=='' ){ //값이 채워져 있으면 사라진다.
    //         $('.guide-birthday-confirm p').eq(1).hide();
    //       }
    //       else{
    //         $('.guide-birthday-confirm p').eq(1).show();
    //       }
  
    //     }
    // });
  
    // //일
    // $('#date').on({
    //     keyup: function(){
    //       var regExp1 = /[^0-9]/g;  //숫자가 아닌것
    //       var yearValue = $(this).val().toString().trim(); //문자열로 변환하고 양쪽 공백을 제거한다.
  
    //           $(this).val(  yearValue.replace(regExp1, '') ); //숫자가 아니면 무조건 공백으로 삭제            
    //     },
    //     focusin: function(){
    //       if( $(this).val()!=='' ){ //값이 채워져 있으면 사라진다.
    //         $('.guide-birthday-confirm p').eq(2).hide();
    //       }
    //       else{ 
    //         if( $('#month').val()==='' && $(this).val()===''){ //월 일 모두 비어있으면
    //           $('.guide-birthday-confirm p').eq(1).show();
    //           $('.guide-birthday-confirm p').eq(2).hide();
    //         }
    //         else{  //일 만 비어 있으면
    //           $('.guide-birthday-confirm p').eq(1).hide();
    //           $('.guide-birthday-confirm p').eq(2).show();
    //         }
    //       }
    //     },      
    //     focusout: function(){
    //       if( $('#month').val()==='' && $(this).val()===''){ //월 일 모두 비어있으면
    //         $('.guide-birthday-confirm p').eq(1).show();
    //         $('.guide-birthday-confirm p').eq(2).hide();
    //       }
    //       else if( $('#month').val()!=='' && $(this).val()!==''){ //월일 모두 채워진경우
    //         $('.guide-birthday-confirm p').eq(1).hide();
    //         $('.guide-birthday-confirm p').eq(2).hide();
    //       }        
    //       else if( $(this).val()!==''){ //일
    //         $('.guide-birthday-confirm p').eq(1).hide();
    //         $('.guide-birthday-confirm p').eq(2).show();
    //       }
  
    //     },
  
    // });



    //약관동의

    //추가 입력 사항

    $('.add-radio').on({
        change: function(){
            console.log( $(this).val() );
            $('.add-input-box').show();
            if($(this).val()==='추천인 아이디'){
                $('#inputAdd').attr("placeholder",'추천인 아이디를 입력해주세요');
            }
            else if($(this).val()==='참여 이벤트'){
                $('#inputAdd').attr("placeholder",'참여 이벤트명을 입력해주세요');
            }
        }
    })


    $('#chk4').on({
        change: function(){

            if( $(this).is(':checked') ){
                $('#chk5').prop('checked', true);
                $('#chk6').prop('checked', true);
            }
            else{
                $('#chk5').prop('checked', false);
                $('#chk6').prop('checked', false);
            }

        }

    });

    //체크5와 체크6 변화에 따라 체크4의 체크 상태를 변경
    $('#chk5').on({
        change: function(){
            if($('#chk5').is(':checked')===false || $('#chk6').is(':checked')===false){
                $('#chk4').prop('checked', false);
            }
            else{
                $('#chk4').prop('checked', true); 
            }
        }
    });

    $('#chk6').on({
        change: function(){
            if($('#chk6').is(':checked')===false || $('#chk5').is(':checked')===false){
                $('#chk4').prop('checked', false);
            }
            else{
                $('#chk4').prop('checked', true); 
            }
        }
    });

    
    

    //부분체크 내용을 먼저 위에 코딩하고
    //아래에서 변경된 모든 체크 상태를 확인하고 카운트
    //위 사항 반영


    
    //체크박스 이벤트

    //.chkbox-btn 7개 반복처리
    chkboxBtn.each(function(idx){
        // console.log( idx );
        $(this).on({
            change: function(){
                // console.log( idx ); //선택한 체크박스 인덱스 번호
                // console.log( $(this).is(':checked') );//체크 상태 확인
                // console.log( $(this).val() ); //선택 항목의 값

                var cnt=0;
                for(var i=0; i<chkboxBtn.length; i++){
                    if(chkboxBtn.eq(i).is(':checked')===true){ //7개를 반복 확인
                        cnt++; 
                    }
                }

                if(cnt===7){
                    $('#chkAll').prop('checked', true); //전체선택을 선택체크
                }
                else{
                    $('#chkAll').prop('checked', false); //전체선택을 체크해제
                }
            }
        });
    });

    //모두 체크하는 chkAll 버튼 이벤트
    $('#chkAll').on({
        change: function(){
            //console.log( $(this).is(':checked') ); //체크됐니? 안됐니?
            //console.log( $(this).val() ); //이(모두체크하는선택자) 체크 박스(버튼)의 값

                //체크올이 true 이면
            if( $(this).is(':checked') ){

                //7개 모두를 체크해 주세요
                chkboxBtn.prop('checked', true);
            }
            else{
                //7개 모두를 체크 해제해 주세요
                chkboxBtn.prop('checked', false);
            }
        }
    });

    // 모달 켜고 끄기
    function modal(message){
        $('.modal-msg').text(message);
        $('#modal').addClass('on');
    }

    $('.modal-close').on({
        click: function(){
            $('#modal').removeClass('on');
        }
    });

    //전송버튼 클릭이벤트
    $('.submit-btn').on({

        click: function(e){
            e.preventDefault(); //submit 기능을 막음


            //변수설정

            var idVal = $('#inputId').val(); //1아이디 (필)
            var pwVal = $('#inputPw').val(); //2비밀번호 (필)
            var nameVal = $('#inputName').val(); //3이름 (필)
            var emailVal = $('#inputEmail').val(); //4이메일(필)
            var phoneVal = $('#inputPhone').val(); //5휴대전화 (필)
            var addressVal = $('#inputAddress1').val() + ' ' + $('#inputAddress2').val(); //6주소(필)
            
            var genderVal = ''; //7성별(택)

            if($('#male').is(':checked')){
                    genderVal = $('#male').val();
                }
                else if($('#female').is(':checked')){
                    genderVal = $('#female').val();
                }
                else{
                    genderVal = $('#none').val();
                }

        
            var birthdayVal = $('#year').val() + '-' + $('#month').val() + '-' + $('#date').val(); //8생년월일 (택)

            var addInputVal = ''; //9추가입력 (택)
                //추가입력 값
                if($('#add1').is(':checked')){
                    addInputVal = $('#add1').val();
                }
                else{
                    addInputVal = $('#add2').val();
                }
            
            var serviceVal = []; //10약관(필)

            //반복문 사용하여 체크상자가 선택된 값을 배열에 저장한다
            $('.chkbox-btn').each(function(){
                if( $(this).is(':checked')){
                    serviceVal.push( $(this).val() );
                }
            });
            
            var cnt=0;
            for(i=0; i<serviceVal.length; i++){
                if( serviceVal[i].indexOf('필수') !== -1){
                    cnt++;
                }
            }
            //필수입력사항 공백없을시 전송
            //

            console.log(idok, phoneok, pwok1, pwok2, pwok3, pwckok, emailok);
            if( idVal==='' || pwVal==='' || nameVal==='' || emailVal==='' || phoneVal==='' || $('#inputAddress1').val() === '' || $('#inputAddress2').val() === '' || cnt<3 ){               
                if(idVal===''){
                    alert('아이디를 입력하세요');
                }
                if(pwVal===''){
                    alert('비밀번호를 입력하세요');
                }
                if(nameVal===''){
                    alert('이름을 입력하세요');
                }
                if(emailVal===''){
                    alert('이메일을 입력하세요');
                }
                if(phoneVal===''){
                    alert('전화번호를 입력하세요');
                }
                if($('#inputAddress1').val()===''){
                    alert('주소를 입력하세요');
                }
                if($('#inputAddress2').val()===''){
                    alert('상세 주소를 입력하세요');
                }
                if(cnt<3){
                    alert('약관에 동의해 주세요');
                }






                //alert('필수 입력사항이 비어 있습니다');
                return; //전송취소
            }
            else if( idok===false || phoneok===false || pwok1===false || pwok2===false || pwok3===false || pwckok === false || emailok === false ){
                if( idok===false ){
                    alert('아이디를 확인하세요');
                }
                if( phoneok===false ){
                    alert('휴대 전화를 인증해 주세요');
                }
                if( pwok1===false ){
                    alert('비밀번호를 확인하세요');
                }
                if( pwok2===false ){
                    alert('비밀번호를 확인하세요');
                }
                if( pwok3===false ){
                    alert('비밀번호를 확인하세요');
                }
                if( pwckok === false ){
                    alert('동일한 비밀번호를 입력하세요');
                }
                if( emailok === false ){
                    alert('이메일을 확인하세요');
                }
                return;
            }
            else {

                //저장데이터 확인
                console.log( idVal, pwVal, nameVal, emailVal, phoneVal, addressVal, genderVal, birthdayVal, addInputVal, serviceVal);    
                var 회원가입 = {
                    아이디: idVal,
                    비밀번호: pwVal,
                    이름: nameVal,
                    이메일: emailVal,
                    전화번호: phoneVal,
                    주소: addressVal,
                    성별: genderVal,
                    생년월일: birthdayVal,
                    추가입력: addInputVal,
                    이용약관: serviceVal                    
                }

                //저장
                localStorage.setItem(회원가입.아이디, JSON.stringify(회원가입));
                format();
            }




            //초기화함수
            function format(){
                //라디오 초기화
                $('#male').prop('checked', false);
                $('#female').prop('checked', false);
                $('#none').prop('checked', false);

                $('#add1').prop('checked', false);
                $('#add2').prop('checked', false);


                //체크박스 초기화
                $('#chkAll').prop('checked', false);
                $('.chkbox-btn').each(function(){
                    $(this).prop('checked', false);
                });

                //전체초기화
                $('#inputId').val('');
                $('#inputPw').val('');
                $('#inputPwChk').val('');
                $('#inputName').val('');
                $('#inputEmail').val('');
                $('#inputPhone').val('');
                $('#inputAddress1').val('');
                $('#inputAddress2').val('');
                $('#year').val('');
                $('#month').val('');
                $('#date').val('');

                
                $('.guide-text p').hide();

                $('.guide-id p').removeClass('error');
                $('.guide-id p').removeClass('success');
          
                $('.guide-pw p').removeClass('error');
                $('.guide-pw p').removeClass('success');
          
                $('.guide-pw-check p').removeClass('error');
                $('.guide-pw-check p').removeClass('success');
          
          
                $('#inputEmail').removeClass('error');
          
                $('#inputPhone').removeClass('error');
                $('.phone-btn').removeClass('on');
                $('#inputPhoneok, .phone-ok-btn').prop('disabled', false);
                $('.phone-ok-btn, #inputPhoneok, .count-timer').hide();
                $('#inputPhoneok, .phone-ok-btn').removeClass('ok');

                $('.guide-address').removeClass('on');
                $('#addressBtn').addClass('address-btn');
                $('#addressBtn i').text('주소검색');
                $('.address input').hide();
          
                $('.guide-birthday-confirm p').hide();
            }


        }           
    });





})(jQuery);
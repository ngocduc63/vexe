const inputList = document.querySelectorAll('.tinh-thanh-input input');
const listTP  = document.querySelectorAll('.thanh-pho-list');
const btnSwap = document.querySelector('.swap');
const btnTimVe = document.querySelector('.btn-search');
const btnPriceRange = document.querySelector('.filter-price__range');
const valuePriceRange = document.querySelector('.filter-price__range--select');
const listTicket = document.querySelectorAll('.ticket');
const imgEmpty = 'url("./assets/img/seat_empty.png")';
const imgChecked = 'url("./assets/img/seat_selected.png")';

const listThanhPho = [
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Tĩnh",
    "Hải Dương",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
    "Phú Yên",
    "Cần Thơ",
    "Đà Nẵng",
    "Hải Phòng",
    "Hà Nội",
    "TP HCM"
];
const itemThanhPho = listThanhPho.map(thanhPho => `<li class='thanh-pho-item' >${thanhPho}</li>`);
listTP.forEach(value =>{
    value.onmousedown = function(e){
        e.preventDefault();
    }
    value.innerHTML = itemThanhPho.join('');
});
inputList.forEach(input =>{
    input.addEventListener('click', function(){
        this.select();
    });
    input.addEventListener('keyup', function(){
        const inputText = this;
        const userNhap = input.value.toLowerCase();
        const listUserNhap = listThanhPho.filter(value => value.toLowerCase().indexOf(userNhap) !== -1);
        const item = listUserNhap.map(thanhPho => `<li class='thanh-pho-item' >${thanhPho}</li>`);
        listTP.forEach(value =>{
            value.innerHTML = item.join('');
        });
        const itemThanhPho = document.querySelectorAll('.thanh-pho-item');
        itemThanhPho.forEach(value => {
            value.addEventListener('click', function(){
                inputText.value = value.innerText;
            })
        });
    })
});

// swap thanh pho
btnSwap.addEventListener('click', function(){
    const tmp= inputList[0].value;
    inputList[0].value = inputList[1].value;
    inputList[1].value = tmp;
});

// set value date mặc định 
const date = new Date();
const optionDate = {day: '2-digit', month : '2-digit', year: 'numeric'};
const inputDate = document.querySelector('.input-ngay-di');
const today = date.toLocaleDateString('en-GB', optionDate);
inputDate.value = today.split('/').reverse().join('-');

// btn tim ve
btnTimVe.addEventListener('click', function(){
    if(inputList[0].value !== inputList[1].value 
        && listThanhPho.indexOf(inputList[0].value) !== -1 
        && listThanhPho.indexOf(inputList[1].value) !== -1
        // so sánh ngày phải lớn hơn ngày hiện tại
        ) 
    {
        // Chọn xong địa điểm
        alert('true');
    }
});
// range price
btnPriceRange.addEventListener('input', function(){
    valuePriceRange.style.display = 'inline-block';
    valuePriceRange.innerText = Math.floor(this.value / 10000) * 10000+ ' đ';
});
btnPriceRange.addEventListener('blur', function(){
    valuePriceRange.style.display = 'none';
});
// selected img detail
const selectedItemImg = function(itemDeTail) {
    const listImgItem = itemDeTail.querySelectorAll('.img-item');
    const imgSelected = itemDeTail.querySelector('.img-selected');
    const btnLeft = itemDeTail.querySelector('.icon-left');
    const btnRight = itemDeTail.querySelector('.icon-right');
    const idPageImg = itemDeTail.querySelector('.id-page__img');
    const listImg = [];
    listImgItem.forEach(function(value, index){
        listImg.push(value.style.backgroundImage);
        value.addEventListener('click', function() {
            itemDeTail.querySelector('.img-item.btn__border--selected').classList.remove('btn__border--selected');
            value.classList.add('btn__border--selected');
            imgSelected.style.backgroundImage = value.style.backgroundImage;
            idPageImg.innerText = `${index + 1}/6`;
            // set button left right hidden or visible
            if(index === 0){
                btnLeft.classList.add('icon--disable');
            } else if(index === 5){
                btnRight.classList.add('icon--disable');
            } else if (index === 1 || index === 2) {
                btnRight.classList.remove('icon--disable');
                btnLeft.classList.remove('icon--disable');
                listImgItem[5].style.display = 'none';
                listImgItem[0].style.display = 'block';
            } else {
                btnLeft.classList.remove('icon--disable');
                btnRight.classList.remove('icon--disable');
                listImgItem[0].style.display = 'none';
                listImgItem[5].style.display = 'block';
            }
        });
    });

    btnLeft.addEventListener('click', function(e) {
        let indexCurrent = listImg.indexOf(imgSelected.style.backgroundImage);
        if(indexCurrent === 0) {
            e.preventDefault();
        }else {
            btnRight.classList.remove('icon--disable');
            idPageImg.innerText = `${indexCurrent}/6`;
            // xóa ảnh đang có border
            itemDeTail.querySelector('.img-item.btn__border--selected').classList.remove('btn__border--selected');
            if(indexCurrent - 1 === 0){
                btnLeft.classList.add('icon--disable');
            } 
                
            if(indexCurrent - 1 < 2){
                listImgItem[5].style.display = 'none';
                listImgItem[0].style.display = 'block';
            };
            imgSelected.style.backgroundImage = listImg[indexCurrent - 1];
            listImgItem[indexCurrent - 1].classList.add('btn__border--selected');   
        }
    });
    btnRight.addEventListener('click', function(e) {
        let indexCurrent = listImg.indexOf(imgSelected.style.backgroundImage);
        if (indexCurrent === 5) {
            e.preventDefault();
        }else {
            idPageImg.innerText = `${indexCurrent + 2}/6`;
            btnLeft.classList.remove('icon--disable');
            // xóa ảnh đang có border
            itemDeTail.querySelector('.img-item.btn__border--selected').classList.remove('btn__border--selected');
            if(indexCurrent + 1 === 5){
                btnRight.classList.add('icon--disable');
                imgSelected.style.backgroundImage = listImg[indexCurrent + 1];
                listImgItem[indexCurrent + 1].classList.add('btn__border--selected');
            } else if(indexCurrent + 1 >= 2){
                listImgItem[0].style.display = 'none';
                listImgItem[5].style.display = 'block';
            }
            imgSelected.style.backgroundImage = listImg[indexCurrent + 1];
            listImgItem[indexCurrent + 1].classList.add('btn__border--selected');
        }
    });
};
// Create detail
const createActiveDeTail = function(ticket) {
    const listDetail = ticket.querySelectorAll('.ticked-detail__main-content');
    const listHeaderDeTail = ticket.querySelectorAll('.ticked-detail__header-item');
    const lineHeaderDeTail = ticket.querySelector('.line');
    const selected = ticket.querySelector('.ticked-detail__header-item.ticked-detail--selected');
    const rect = selected.getBoundingClientRect();
    // active detail
    // Lỗi offSetLeft và offSetWidth trả về undifine ?
    const rect0Left = ticket.querySelectorAll('.ticked-detail__header-item')[0].getBoundingClientRect().left;
    lineHeaderDeTail.style.left = `${rect.left - rect0Left}px`;
    lineHeaderDeTail.style.width = `${rect.width}px`;
    // form img
    selectedItemImg(listDetail[0]);
    listHeaderDeTail.forEach((value, index) => {
        const itemDeTail = listDetail[index];
        value.addEventListener('click', function(){
            // hủy các element đã select;
            ticket.querySelector('.ticked-detail__main-content.active').classList.remove('active')
            ticket.querySelector('.ticked-detail__header-item.ticked-detail--selected').classList.remove('ticked-detail--selected');
            const rectClick = this.getBoundingClientRect();
            lineHeaderDeTail.style.left = (rectClick.left - rect0Left) + 'px';
            lineHeaderDeTail.style.width = rectClick.width + 'px';
            itemDeTail.classList.add('active');
            value.classList.add('ticked-detail--selected');
        });
    });
};
//Set mac dinh detail
const setMacDinh = function(ticket, index) {
    // xóa hết các element đang active
    ticket.querySelector('.ticked-detail__main-content.active').classList.remove('active')
    ticket.querySelector('.ticked-detail__header-item.ticked-detail--selected').classList.remove('ticked-detail--selected');
    // set lại mặc định là index;
    const listDetail = ticket.querySelectorAll('.ticked-detail__main-content');
    const listHeaderDeTail = ticket.querySelectorAll('.ticked-detail__header-item');
    listDetail[index].classList.add('active');
    listHeaderDeTail[index].classList.add('ticked-detail--selected');
};

const setDefaultSeat = function(listSeat, seatLast, listSeatDisable, imgEmpty) {
    listSeat.forEach(seat => {
        seat.style.backgroundImage = imgEmpty;
    })
    listSeatDisable.forEach(seat=> {
        seat.style.backgroundImage = 'none';
    })
    seatLast.style.backgroundImage = imgEmpty;
}
const seatCheckedImg = function(seat, imgChecked) {
    return seat.style.backgroundImage === imgChecked
}

function addCheckedImg() {
    if(seatCheckedImg(this, imgChecked)){
        this.style.backgroundImage = imgEmpty;
        
    }else {
        this.style.backgroundImage = imgChecked;

    }
}
function selectedTicket(ticket) {
    const listSeat = ticket.querySelectorAll('table tr:nth-child(n+3) td');
    const listSeatDisable = ticket.querySelectorAll('table tr:nth-child(n+2) td:nth-child(3)');
    const seatLast = ticket.querySelector('table tr:last-child td:nth-child(3)');
    const totalPrice = ticket.querySelector('.total-price span');
    const tableTickcet = ticket.querySelector('table');
    const listBuyContent = ticket.querySelectorAll('.ticket-buy__content');
    const ticketDetailHeader = ticket.querySelectorAll('.ticket-buy__step-detail');
    const ticketDetailHeaderStep = ticket.querySelectorAll('.ticket-buy__step-detail span');
    const lineStepHeader = ticket.querySelectorAll('.line-step');
    const total = ticket.querySelector('.total-ticket');
    const totalLeft = ticket.querySelector('.total-ticket__left');
    const btnNext = ticket.querySelector('.btn-next-step');
    const btnBack = ticket.querySelector('.btn-back-step');
    const txtNumberSeat = ticket.querySelector('.number-seat span');
    const labelNumberSeat = ticket.querySelector('.number-seat');
    const priceTicket = 120000; // gia ve 120k
    let numberSeat = '';
    let relustPriceTicket = 0;
    setDefaultSeat(listSeat, seatLast, listSeatDisable, imgEmpty, imgChecked);
    listSeat.forEach(seat => {
        seat.addEventListener('click', addCheckedImg);
    });
    listSeatDisable.forEach(seat => {
        seat.removeEventListener('click', addCheckedImg);
    })
    seatLast.addEventListener('click', addCheckedImg);
    // tính tổng giá
    tableTickcet.addEventListener('click', function() {
        let countSeat = 0;
        numberSeat = '';
        listSeat.forEach(seat => {
            if(seat.style.backgroundImage === imgChecked){
                countSeat++;
                totalPrice.innerText = `${countSeat * priceTicket} đ`;
                // lấy số ghế 
                seat.querySelectorAll('.td-after').forEach( laySoGhe =>{
                    numberSeat += laySoGhe.innerText.substr(8, 2) + ' ';
                });
            } 
        })
        relustPriceTicket = countSeat * priceTicket;
        if(relustPriceTicket == 0){
            // truong hop het vong lap ma van ko tim thay ve nao dc chon thi set txtPrice = 0
            totalPrice.innerText = `${relustPriceTicket} đ`;
            indexCurrentTicket = 0;
            // ẩn số ghế đã chọn
            totalLeft.style.display = 'none';
            total.style.justifyContent = 'flex-end';
        }else {
            totalPrice.innerText = `${relustPriceTicket} đ`;
            // hiện số ghế, set text so ghe đã chọn ở totalLeft nhưng ẩn nut back đi
            totalLeft.style.display = 'flex'
            total.style.justifyContent = 'space-between';
            txtNumberSeat.innerText = numberSeat;
            btnBack.style.display = 'none';
            labelNumberSeat.style.display = 'block';
        }
    })

// khoi tao from chon ghe va nhap thong tin
// cac buoc chon ghe nhap thong tin
    // tim header nao co class step--selected thi xoa di, add class step--nomal
    ticketDetailHeader.forEach( headerStep => {
        headerStep.classList.remove('step--selected');
        headerStep.classList.add('step--nomal');
    })
    // thay txtHeader ve dang so
    ticketDetailHeaderStep.forEach((txtHeader, index) => {
        txtHeader.innerHTML = index + 1;
    })
    // de header[0] mac dinh
    ticketDetailHeader[0].classList.add('step--selected');
    // index step = 0
    let indexCurrentTicket = 0;
    // de background color line step ve #e8e8e8
    lineStepHeader.forEach(line => {
        line.style.backgroundColor = '#e8e8e8';
    })
    // cho gia ve ve 0
    totalPrice.innerText = `0 đ`;
    // chỉ hiện form 1 ẩn hểt 2 form còn lại
    listBuyContent[0].style.display = 'flex';
    listBuyContent[1].style.display = 'none';
    listBuyContent[2].style.display = 'none';
    // ẩn nút back số ghế 
    totalLeft.style.display = 'none';
    total.style.justifyContent = 'flex-end';
// end khoi tao form   
    // btn next step
    btnNext.addEventListener('click', function() {
        indexCurrentTicket ++;
        if(relustPriceTicket > 0){
            //ẩn số ghế hiện nút back va formLeft 
            totalLeft.style.display = 'flex';
            total.style.justifyContent = 'space-between';
            btnBack.style.display = 'block';
            labelNumberSeat.style.display = 'none';
            // hien form tiep va an form hien tai (index da tang len 1 roi nen form hien tai la index-1)
            listBuyContent[indexCurrentTicket].style.display = 'flex';
            listBuyContent[indexCurrentTicket - 1].style.display = 'none';
            // set header 
            ticketDetailHeader[indexCurrentTicket -1].classList.remove('step--selected');
            ticketDetailHeader[indexCurrentTicket -1].classList.remove('step--nomal');
            ticketDetailHeader[indexCurrentTicket].classList.add('step--selected');
            ticketDetailHeaderStep[indexCurrentTicket -1].innerHTML = '<i class="fa-solid fa-check icon-ckeck"></i>';
            // set header line
            lineStepHeader[indexCurrentTicket - 1].style.backgroundColor = 'var(--primary-color)';
        }
        // còn check xem nhập thông tin chưa
        else {
            if (indexCurrentTicket == 1) {
                alert('Vui lòng chọn ghế ngồi!');
            }
            indexCurrentTicket --;
        }
    })
    // btn back step
    btnBack.addEventListener('click', function() {
        // index la form hien tai
        // nếu mà quay lại thì ẩn form hiện tại hiện form hiện tại -1
        listBuyContent[indexCurrentTicket].style.display = 'none';
        listBuyContent[indexCurrentTicket - 1].style.display = 'flex';
        // set header
        ticketDetailHeader[indexCurrentTicket - 1].classList.add('step--selected');
        ticketDetailHeader[indexCurrentTicket - 1].classList.add('step--nomal');
        ticketDetailHeader[indexCurrentTicket].classList.remove('step--selected');
        ticketDetailHeaderStep[indexCurrentTicket -1].innerHTML = indexCurrentTicket;
        // huy line header 
        lineStepHeader[indexCurrentTicket - 1].style.backgroundColor = "#e8e8e8";
        // Mỗi lần ẩn thì giảm index đi 1
        indexCurrentTicket--;
        // nếu form hiện tại -1 == 0 thì display của total-left = none - trả total về flex-end
        if(indexCurrentTicket == 0) {
            totalLeft.style.display = 'none';
            total.style.justifyContent = 'flex-end';
            if(relustPriceTicket !== 0) {
                totalPrice.innerText = `${relustPriceTicket} đ`;
                // hiện số ghế đã chọn ở totalLeft nhưng ẩn nut back đi
                totalLeft.style.display = 'flex'
                total.style.justifyContent = 'space-between';
                txtNumberSeat.innerText = numberSeat;
                btnBack.style.display = 'none';
                labelNumberSeat.style.display = 'block';
            }
        }
    })
}
// booking ticket
const closeBooking = function(btnClose, btnBooking) {
    btnClose.addEventListener('click', function() {
        btnClose.style.display = 'none';
        btnBooking.style.display = 'block';
    })
}
// main detail
listTicket.forEach(ticket => {
    const btnDetail = ticket.querySelector('.detail-btn');
    const iconBtnDeTail = ticket.querySelector('.detail-btn i');
    const mainDeTail = ticket.querySelector('.ticked-detail');
    const ratingStar = ticket.querySelector('.ticket-info__bus-rating');
    const btnBooking = ticket.querySelector('.booking-btn');
    const btnClose  = ticket.querySelector('.close-btn');
    const ticketBuy = ticket.querySelector('.ticket-buy');
    //click rating star
    ratingStar.addEventListener('click', function() {
        // set mac dinh star
        setMacDinh(ticket, 4);
        mainDeTail.style.display = 'block';
        iconBtnDeTail.classList.remove('fa-caret-down');
        iconBtnDeTail.classList.add('fa-caret-up');
        createActiveDeTail(ticket);
        // đóng form chọn ghế
        btnClose.style.display = 'none';
        btnBooking.style.display = 'block';
        ticketBuy.style.display = 'none';
    });
    btnDetail.addEventListener('click', function() {
        if (mainDeTail.style.display !== 'block'){
            btnClose.style.display = 'none';
            btnBooking.style.display = 'block';
            mainDeTail.style.display = 'block';
            ticketBuy.style.display = 'none';
            iconBtnDeTail.classList.remove('fa-caret-down');
            iconBtnDeTail.classList.add('fa-caret-up');
           createActiveDeTail(ticket);
        }else {
           mainDeTail.style.display = 'none';
            iconBtnDeTail.classList.remove('fa-caret-up');
            iconBtnDeTail.classList.add('fa-caret-down');
            // set lại như ban đầu
            setMacDinh(ticket, 0);
        }
    });
    // booking ticket
    btnBooking.addEventListener('click', function() {
        btnClose.style.display = 'block';
        btnBooking.style.display = 'none';
        selectedTicket(ticket);
        // close thong tin chi tiet
        ticketBuy.style.display = 'block';
        mainDeTail.style.display = 'none';
        iconBtnDeTail.classList.remove('fa-caret-up');
        iconBtnDeTail.classList.add('fa-caret-down');
        // set lại như ban đầu
        setMacDinh(ticket, 0);
    });
    btnClose.addEventListener('click', function() {
        btnClose.style.display = 'none';
        btnBooking.style.display = 'block';
        ticketBuy.style.display = 'none';
    })
});

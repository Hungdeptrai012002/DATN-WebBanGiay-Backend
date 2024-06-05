const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// Tải các biến môi trường từ tệp .env
dotenv.config();

// Tạo đối tượng transporter sử dụng giao thức SMTP với thông tin từ Gmail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true cho cổng 465, false cho các cổng khác
  auth: {
    user: process.env.MAIL_ACCOUNT, // tài khoản Gmail từ biến môi trường
    pass: process.env.MAIL_PASSWORD, // mật khẩu Gmail từ biến môi trường
  },
});

// Hàm chính để gửi email
async function main(email, orderItems) {
  try {
    let listItem = '';
    orderItems.forEach((order) => {
      listItem += `<div>
        <div>Bạn đã đặt sản phẩm <b>${order?.name}</b> với số lượng là: <b>${order?.amount}</b> và giá là: <b>${order?.price}VND</b></div>
        
      </div>`;
    });

    // Debugging
    // console.log('Generated HTML:', listItem);

    // Gửi email với đối tượng transporter đã định nghĩa
    const info = await transporter.sendMail({
      from: process.env.MAIL_ACCOUNT, // địa chỉ người gửi
      to: 'hungdeptrai012002@gmail.com', // danh sách người nhận
      subject: "Bạn đã đặt hàng thành công tại GiayPro", // tiêu đề email
      text: "Hello world?", // nội dung văn bản
      html: `<div><b>Bạn đã đặt hàng thành công tại GiayPro</b></div> ${listItem}`, // nội dung html
    });

    // console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

// Hàm để gọi hàm main và bắt lỗi nếu có
const sendMailCreateOrder = async (email, orderItems) => {
  await main(email, orderItems).catch(console.error);
};

module.exports = {
  sendMailCreateOrder
};
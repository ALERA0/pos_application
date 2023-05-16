import { Button, Carousel, Form, Input, message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      if (res.status === 200) {
        message.success("Başarıyla kayıt oldunuz!");
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      message.error("Bir hata oluştu!");
      console.log(error);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex  justify-between h-full ">
        <div className="flex flex-col h-full justify-center w-full xl:px-20 px-10 ">
          <h1 className="text-center text-5xl font-bold mb-2  ">LOGO</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Kullanıcı Adı"
              name={"username"}
              rules={[
                { required: true, message: "Kullanıcı Adı boş bırakılamaz!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name={"email"}
              rules={[{ required: true, message: "E-mail boş bırakılamaz!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[{ required: true, message: "Şifre boş bırakılamaz!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Tekrar Şifre"
              name={"passwordAgain"}
              dependencies={["password"]}
              rules={[
                { required: true, message: "Şifre Tekrarı  boş bırakılamaz!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Kaydol
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center mt-5">
            Bir hesabınız var mı?{" "}
            <Link to="/login" className="text-blue-500">
              Giriş Yap
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] ">
          <div className="w-full">
            <Carousel className="px-6" autoplay>
              <AuthCarousel
                img="images/responsive.svg"
                title="Responsive"
                desc="Tüm Cihaz Boyutlarıyla Uyumluluk"
              />
              <AuthCarousel
                img="images/statistic.svg"
                title="İstatistikler"
                desc="Geniş Tutulan İstatistikler"
              />
              <AuthCarousel
                img="images/customer.svg"
                title="Müşteri Memnuniyeti"
                desc="Deneyim Sonunda Üründen Memnun Müşteriler"
              />
              <AuthCarousel
                img="images/admin.svg"
                title="Yönetim Paneli"
                desc="Tek Yerden Yönetim"
              />
            </Carousel>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Register;

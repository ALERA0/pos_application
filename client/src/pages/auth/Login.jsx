import { Button, Carousel, Checkbox, Form, Input, message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const user = await res.json();

      if (res.status === 200) {
        localStorage.setItem(
          "posUser",
          JSON.stringify({
            username: user.username,
            email: user.email,
          })
        );
      }

      if (res.status === 200) {
        message.success("Giriş işlemi başarılı!");
        navigate("/");
      } else if (res.status === 404) {
        message.error("Böyle bir kullanıcı bulunamadı!");
      } else if (res.status === 403) {
        message.error("Šifre yanlış!");
      }
      setLoading(false);
    } catch (error) {
      message.error("Bir hata oluştu!");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex  justify-between h-full ">
        <div className="flex flex-col h-full justify-center w-full xl:px-20 px-10 ">
          <h1 className="text-center text-5xl font-bold mb-2  ">LOGO</h1>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ remember: true }}
          >
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
            <Form.Item name={"remember"} valuePropName="checked">
              <div className="flex justify-between items-center">
                <Checkbox>Beni Hatırla</Checkbox>
                <Link>Şifreni mi Unuttun?</Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center mt-5">
            Henüz Bir Hesabınız Yok Mu?{" "}
            <Link to="/register" className="text-blue-500">
              Şimdi Kaydol
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

export default Login;

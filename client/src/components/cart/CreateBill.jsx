import { Button, Card, Form, Input, Modal, Select, message } from "antd";
import React from "react";
import { useSelector ,useDispatch} from "react-redux";
import { reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: ((cart.total * cart.tax) / 100).toFixed(2),
          totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems: cart.cartItems,
        }),
        headers:  { "Content-type": "application/json; charset=UTF-8" },
      });
      if (res.status === 200) {
        message.success("Fatura Oluşturuldu");
        dispatch(reset());
        navigate("/bills");
      }
    } catch (error) {
      message.danger("Bir şeyler yanlış gitti...");
    }
  };

  return (
    <Modal
      title="Fatura Oluştur"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Müşteri Adı"
          rules={[{ required: true, message: "MÜŞTERİ ADI BOŞ BIRAKILAMAZ!" }]}
          name={"customerName"}
        >
          <Input placeholder="Bir Müşteri Adı Yazınız" />
        </Form.Item>
        <Form.Item
          label="Tel no"
          rules={[
            { required: true, message: "TELEFON NUMARASI BOŞ BIRAKILAMAZ!" },
          ]}
          name={"customerPhoneNumber"}
        >
          <Input placeholder="Bir Telefon Numarası Yazınız" maxLength={11} />
        </Form.Item>
        <Form.Item
          label="Ödeme Yöntemi"
          rules={[
            { required: true, message: "ÖDEME YÖNTEMİ BOŞ BIRAKILAMAZ!" },
          ]}
          name={"paymentMode"}
        >
          <Select placeholder="Ödeme Yöntemi">
            <Select.Option value="Nakit">Nakit</Select.Option>
            <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
          </Select>
        </Form.Item>

        <Card className="">
          <div className="flex justify-between">
            <span>Ara Toplam</span>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
          </div>
          <div className="flex justify-between my-2">
            <span>KDV %{cart.tax}</span>
            <span className="text-red-500">
              +{((cart.total * cart.tax) / 100).toFixed(2)}₺
            </span>
          </div>
          <div className="flex justify-between">
            <b>Toplam</b>
            <b>{(cart.total + (cart.total * cart.tax) / 100).toFixed(2)}₺</b>
          </div>
          <div className="flex justify-end">
            <Button
              className="w- mt-4"
              type="primary"
              onClick={() => setIsModalOpen(true)}
              htmlType="submit"
              disabled={cart.cartItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default CreateBill;

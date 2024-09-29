export function DisplayPrice(price) {
  return `${price.toLocaleString("vi-VN")} đ`
}

function BoDauTiengViet(word) {  
  word = word.replace(/[áàảãạăắằẳẵặâấầẩẫậ]/g, "a");
  word = word.replace(/[đ]/g, "d");
  word = word.replace(/[éèẻẽẹêếềểễệ]/g, "e");
  word = word.replace(/[íìỉĩị]/g, "i");
  word = word.replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, "o");
  word = word.replace(/[úùủũụưứừửữự]/g, "u");
  return word.replace(/[ýỳỷỹỵ]/g, "y");
}

export function CamelToKebab(camel) {
  return BoDauTiengViet(camel.replace(" ", "-").toLowerCase());
}
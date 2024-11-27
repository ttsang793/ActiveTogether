export function DisplayPrice(price) {
  return `${price.toLocaleString("vi-VN")} đ`
}

export function BoDauTiengViet(word) {  
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

export function ParseDateTime(strDate) {
  const year = Number(strDate.substring(0, 4));
  const month = Number(strDate.substring(5, 7)) - 1;
  const date = Number(strDate.substring(8, 10));

  return new Date(year, month, date);
}

export function DisplayDate(dateTime) {
  const last = dateTime.indexOf("T");
  return dateTime.substring(0, last);
}

export function Encode(...element) {
  let plain = btoa(element[0] + ":" + element[1] + "$Active$Together");
  let cypher = "#";
  while (plain.length > 0) {
    if (plain.length <= 7) {
      cypher += plain;
      break;
    }
    else cypher += plain.substring(0,7);
    cypher += "#";
    plain = plain.substring(7);
  }
  return cypher;
}

export function Encode2(...element) {
  let plain = btoa(element[0] + "Tog:eth$er" + element[1].substring(0,5) + "ct$$iv" + element[1].substring(5) + "a@@e");
  let cypher = "#";
  while (plain.length > 0) {
    if (plain.length <= 7) {
      cypher += plain;
      break;
    }
    else cypher += plain.substring(0,7);
    cypher += "#";
    plain = plain.substring(7);
  }
  return cypher;
}

export function DisplayConfig(color, size) {
  return "(Màu: " + color + (size !== "FREE" ? " - Size: " + size : "") + ")";
}
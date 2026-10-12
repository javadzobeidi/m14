import React, { useState } from 'react';

// === داده‌های پایه ===
const initialData = {
  "organId": "14000167358",
  "requestUniqueId": "39239",
  "elzam14": true,
  "IssueNo": "17475",
  "IssueDate": "1403/06/27",
  "IssueTime": "10:40",
  "ActionReferenceType": 1,
  "ActionReferenceNo": "14000167358",
  "EstateTypeCode": "30",
  "Province": "14",
  "Unit": "17001",
  "Section": "08",
  "SubSection": "02",
  "Basic": "1706",
  "Secondary": "955",
  "JamCode": "140020317001010289",
  "Address": "اهواز-2- محله کيان آباد - خیابان انتهاي خ 28سمت راه آهن- پلاک94-ساختمان بهمنی",
  "Area": 199.64,
  "PostalCode": "6154684974",
  "TotalBlockNo": 1,
  "Block": [
    {
      "BlockNo": 1,
      "BlockName": "1",
      "StructureType": 2,
      "Limitation": "از شمال 6.25 متر...",
      "Class": [
        {
          "ClassNo": 0,
          "ClassUnitNo": 2,
          "ClassArea": 120.36,
          "EstateUnits": [
            {
              "EstateUnitNo": 1,
              "UnitArea": 15,
              "Usage": "3",
              "Limitation": "حدود اربعه..."
            }
          ],
          "Joint": [
            {
              "BlockNo": 1,
              "Code": "1",
              "Area": 11.50,
              "Usage": "1",
              "Sector": "10",
              "Limitation": "قطعه یک"
            }
          ]
        }
      ]
    }
  ],
  "OwnersInfo": [
    {
      "NationalNo": "1741191408",
      "Type": "310103",
      "Name": "علی محمد",
      "Family": "راديگانه ",
      "BirthDate": "1371/08/09",
      "FatherName": "غلامعلی",
      "OwnersAddress": "اکيانشهر خيابان لاله 1",
      "ElectronicEstateNoteNo": "140020317001010289",
      "ContactNo": "09169064940"
    }
  ],
  "MainPlan": {
    "Type": "application/pdf",
    "FileName": "Unconfirmed_489711.pdf",
    "File": "",
    "EstateMap": {
      "Type": "FeatureCollection",
      "Name": "پلان اندازه‌گذاری طبقات",
      "CoordinateReferenceSystem": {
        "Type": "Feature",
        "Properties": {
          "Name": "EPSG:4326"
        }
      },
      "Features": [
        {
          "Type": "Feature",
          "Properties": {},
          "Geometry": {
            "Type": "Polygon",
            "Coordinates": [[]]
          }
        }
      ]
    }
  },
  "UnitPlans": []
};

const estateTypes = [{"id":1,"name":"تجاری"},{"id":2,"name":"اداری"},{"id":3,"name":"مسکونی"},{"id":4,"name":"آموزشی"},{"id":5,"name":"مکان ورزشی"},{"id":6,"name":"اماکن مقدسه"},{"id":7,"name":"فضای سبزعمومی"},{"id":8,"name":"نیمه تمام"},{"id":9,"name":"مزروعی-بیشه زار"},{"id":10,"name":"تفریحی"},{"id":11,"name":"خدمات عمومی"},{"id":12,"name":"محوطه"},{"id":13,"name":"بهارخواب"},{"id":14,"name":"موات"},{"id":15,"name":"مرتع"},{"id":16,"name":"جنگل"},{"id":17,"name":"مغازه"},{"id":18,"name":"زمین غیر محصور"},{"id":19,"name":"حمام"},{"id":20,"name":"گلخانه"},{"id":21,"name":"آپارتمان"},{"id":22,"name":"آسیاب"},{"id":23,"name":"اطاق"},{"id":24,"name":"انبار"},{"id":25,"name":"باغ"},{"id":26,"name":"بنای احداثی"},{"id":27,"name":"بهاربند"},{"id":28,"name":"پس اطاق"},{"id":29,"name":"پناهگاه"},{"id":30,"name":"تجاری مسکونی"},{"id":31,"name":"چاه آب"},{"id":32,"name":"چنارستان"},{"id":33,"name":"قلمستان"},{"id":34,"name":"چهار دیواری"},{"id":35,"name":"خانه"},{"id":36,"name":"درخت خرما"},{"id":37,"name":"درخت گردو"},{"id":38,"name":"درشکه خانه"},{"id":39,"name":"زمین"},{"id":40,"name":"ساختمان"},{"id":41,"name":"سرداب"},{"id":42,"name":"سقاخانه"},{"id":43,"name":"طویله"},{"id":44,"name":"غسالخانه"},{"id":45,"name":"قنات"},{"id":46,"name":"قهوه خانه"},{"id":47,"name":"کاهدان"},{"id":48,"name":"کوره"},{"id":49,"name":"کارخانه"},{"id":50,"name":"کارگاه"},{"id":51,"name":"کاروانسرا"},{"id":52,"name":"گاراژ"},{"id":53,"name":"گچپزخانه"},{"id":54,"name":"مجرای چشمه"},{"id":55,"name":"مجرای قنات"},{"id":56,"name":"درخت پسته"},{"id":57,"name":"مرغداری دامداری"},{"id":58,"name":"مستراح"},{"id":59,"name":"نانوایی"},{"id":60,"name":"یخچال"},{"id":61,"name":"اتاق گنبدی"},{"id":62,"name":"تیمچه"},{"id":63,"name":"تکیه"},{"id":64,"name":"خلوت"},{"id":65,"name":"آب انبار"},{"id":66,"name":"صفه عزاخانه"},{"id":67,"name":"دالان وچاه آب"},{"id":68,"name":"صندوقخانه"},{"id":69,"name":"عمارت"},{"id":70,"name":"دولاب"},{"id":71,"name":"کله کار"},{"id":72,"name":"جازدان"},{"id":73,"name":"سالن"},{"id":74,"name":"کتابخانه"},{"id":75,"name":"بالا خانه"},{"id":76,"name":"تختگاه"},{"id":77,"name":"طاحونه خانه"},{"id":78,"name":"طاحونه برج"},{"id":79,"name":"طاحونه"},{"id":80,"name":"گاوگرد"},{"id":81,"name":"مشاعات خانه"},{"id":82,"name":"حجره"},{"id":83,"name":"حوضخانه"},{"id":84,"name":"رخت شوخانه"},{"id":85,"name":"پایاب عمومی"},{"id":86,"name":"آب نما"},{"id":87,"name":"طاق"},{"id":88,"name":"گلخن"},{"id":89,"name":"خالیه باغ"},{"id":90,"name":"کنسولخانه"},{"id":91,"name":"نما"},{"id":92,"name":"سه درب اتاق"},{"id":93,"name":"باریکه"},{"id":94,"name":"مطبخ"},{"id":95,"name":"افشاد"},{"id":96,"name":"مشاعات"},{"id":97,"name":"کریاس"},{"id":98,"name":"سه دری"},{"id":99,"name":"مقبره"},{"id":100,"name":"مزار"},{"id":101,"name":"برج"},{"id":102,"name":"لیت"},{"id":103,"name":"اراضی مشاعی"},{"id":104,"name":"زمین مشاعی"},{"id":105,"name":"اراضی قنات"},{"id":106,"name":"قبرستان"},{"id":107,"name":"ارگ"},{"id":108,"name":"پاساژ"},{"id":109,"name":"بازارچه"},{"id":110,"name":"قرائت خانه"},{"id":111,"name":"کشتارگاه"},{"id":112,"name":"تجارت خانه"},{"id":113,"name":"شیرخوارگاه"},{"id":114,"name":"نیم طبقه"},{"id":115,"name":"پرورشگاه"},{"id":116,"name":"آثار باستانی"},{"id":117,"name":"مسافرخانه"},{"id":118,"name":"غذاخوری"},{"id":119,"name":"آپارتمان فرهنگی"},{"id":120,"name":"سالن اداری"},{"id":121,"name":"زیرزمین تجاری"},{"id":122,"name":"اعیانی"},{"id":123,"name":"واحد تفرجگاهی(فرهنگی-پذیرایی)"},{"id":124,"name":"واحد تفرجگاهی(هنری-فرهنگی-پذیرایی)"},{"id":125,"name":"تعمیرگاه"},{"id":126,"name":"منزل مسکونی"},{"id":127,"name":"توتستان"},{"id":128,"name":"سا لن ورزشی"},{"id":129,"name":"ایستگاه مترو"},{"id":130,"name":"پارکینگ تجاری"},{"id":131,"name":"استخر"},{"id":132,"name":"مدرسه"},{"id":133,"name":"سینما"},{"id":134,"name":"کارگاه فرهنگی و گردشگری"},{"id":135,"name":"زیر پله تجاری"},{"id":136,"name":"آپارتمان اداری"},{"id":137,"name":"آپارتمان تجاری"},{"id":138,"name":"آپارتمان مسکونی"},{"id":139,"name":"واحد تجاری"},{"id":140,"name":"واحد اداری"},{"id":141,"name":"واحد مسکونی"},{"id":142,"name":"پست برق"},{"id":143,"name":"شالوده خانه"},{"id":144,"name":"شالوده مغازه"},{"id":145,"name":"سونا و استخر"},{"id":146,"name":"دو درب اتاق"},{"id":147,"name":"اراضی ملی"},{"id":148,"name":"فروشگاه"},{"id":149,"name":"شالوده آپارتمان"},{"id":150,"name":"گذرگاه"},{"id":151,"name":"مسافرخانه و غذاخوری"},{"id":152,"name":"واحد صنعتی"},{"id":153,"name":"رستوران"},{"id":154,"name":"آشپزخانه"},{"id":155,"name":"مجموعه فرهنگی"},{"id":156,"name":"شالوده ساختمان"},{"id":157,"name":"غرفه"},{"id":158,"name":"مزروعی دیمی"},{"id":159,"name":"مزروعی آبی"},{"id":160,"name":"واحد خدمات عمومی"},{"id":161,"name":"مرتع غیر مشجر"},{"id":162,"name":"زمین محصور"},{"id":163,"name":"خانه مشتمل بر دکاکین"},{"id":164,"name":"دو باب مغازه (تحت یک پلاک)"},{"id":165,"name":"خانه مشتمل بر باغ"},{"id":166,"name":"خانه مشتمل بر مغازه"},{"id":167,"name":"خانه مشتمل بر انباری"},{"id":168,"name":"باشگاه ورزشی"},{"id":169,"name":"باشگاه ورزشی تجاری"},{"id":170,"name":"خانه مشتمل بر کارگاه"},{"id":171,"name":"خانه مشتمل بر محوطه"},{"id":172,"name":"خانه مشتمل بر طبقه فوقانی"},{"id":173,"name":"درمانگاه"},{"id":174,"name":"تراسه"},{"id":175,"name":"بیمارستان"},{"id":176,"name":"آمفی تئاتر"},{"id":177,"name":"نمازخانه"},{"id":178,"name":"نگارخانه"},{"id":179,"name":"زمین مشجر"},{"id":180,"name":"خانه مخروبه"},{"id":181,"name":"خرابه"},{"id":182,"name":"خانه و مغازه"},{"id":183,"name":"خانه نیمه ساز"},{"id":184,"name":"دفتر کار"},{"id":185,"name":"هتل"},{"id":186,"name":"جوی متروکه"},{"id":187,"name":"واحد خدماتی"},{"id":188,"name":"انباری و مرغداری"},{"id":189,"name":"زمین موقوفه"},{"id":190,"name":"زمین بایر"},{"id":191,"name":"سوئیت"},{"id":192,"name":"نخلستان"},{"id":193,"name":"آپارتمان تریبلکس"},{"id":194,"name":"آپارتمان کواتروپلکس"},{"id":195,"name":"گرمابه"},{"id":196,"name":"زمین مشجر با بنای احداثی"},{"id":197,"name":"مزروعی مشجر"},{"id":198,"name":"آپارتمان بدون حق دسترسی به حیاط"},{"id":199,"name":"حسینیه"},{"id":200,"name":"هنرستان"},{"id":201,"name":"محوطه تجاری"},{"id":202,"name":"مطب"},{"id":203,"name":"واحد بهداشتی درمانی"},{"id":204,"name":"زمین با بنای احداثی"},{"id":205,"name":"انباری مسکونی"},{"id":206,"name":"انبار تجاری"},{"id":207,"name":"پرورش ماهی"},{"id":208,"name":"گاوداری"},{"id":209,"name":"مرغداری"},{"id":210,"name":"دامداری"},{"id":211,"name":"اصطبل"},{"id":212,"name":"سالن اجتماعات"},{"id":213,"name":"زمین زراعی"},{"id":214,"name":"آپارتمان میانی شمالی"},{"id":215,"name":"آپارتمان میانی شرقی"},{"id":216,"name":"آپارتمان میانی جنوبی"},{"id":217,"name":"آپارتمان میانی غربی"},{"id":218,"name":"پارکینگ طبقاتی"},{"id":219,"name":"پارکینگ طبقاتی در دو طبقه"},{"id":220,"name":"پارکینگ طبقاتی در سه طبقه"},{"id":221,"name":"پارکینگ طبقاتی در چهار طبقه"},{"id":222,"name":"پارکینگ طبقاتی در پنج طبقه"},{"id":223,"name":"پارکینگ طبقاتی در شش طبقه"},{"id":224,"name":"پارکینگ طبقاتی در هفت طبقه"},{"id":225,"name":"پارکینگ طبقاتی در هشت طبقه"},{"id":226,"name":"پارکینگ طبقاتی در نه طبقه"},{"id":227,"name":"پارکینگ طبقاتی در ده طبقه"},{"id":228,"name":"تالار پذیرائی"},{"id":229,"name":"ویترین تجاری"},{"id":230,"name":"مسجد"},{"id":231,"name":"پیشخوان"},{"id":232,"name":"ورزن"},{"id":233,"name":"معدن"},{"id":234,"name":"لابراتوار"},{"id":235,"name":"اتاق تاسیسات برق"},{"id":236,"name":"زیر زمین"},{"id":237,"name":"مهد کودک"},{"id":238,"name":"واحد تولیدی"},{"id":239,"name":"مجتمع فرهنگی و هنری"},{"id":240,"name":"مجتمع آموزشی"},{"id":241,"name":"سوله"},{"id":242,"name":"پارکینگ"},{"id":243,"name":"هتل آپارتمان"},{"id":244,"name":"جایگاه سوخت"},{"id":245,"name":"شارع متروکه"},{"id":246,"name":"مفروزالعماره"},{"id":247,"name":"فوقانی"},{"id":248,"name":"تحتانی"},{"id":249,"name":"آپارتمان آموزشی"},{"id":250,"name":"آپارتمان داروخانه"},{"id":251,"name":"انبار تولیدی"},{"id":252,"name":"آپارتمان دوبلکس تجاری اداری"},{"id":253,"name":"شهربازی"},{"id":254,"name":"راهدارخانه"},{"id":255,"name":"متل"},{"id":256,"name":"کتابخانه"},{"id":257,"name":"کوله"},{"id":258,"name":"اراضی مستحدثات ساحلی"},{"id":259,"name":"اراضی ساحلی"},{"id":260,"name":"کلیسا"},{"id":261,"name":"استخر"},{"id":262,"name":"خانه سازمانی"},{"id":263,"name":"مزرعه و قنات"},{"id":264,"name":"نیروگاه سیکل ترکیبی"},{"id":265,"name":"تفریحی و ورزشی"},{"id":266,"name":"حسینیه مشاعی"},{"id":267,"name":"آپارتمان با کاربری مذهبی"},{"id":268,"name":"اردوگاه آموزشی تفریحی"},{"id":269,"name":"نظامی"},{"id":270,"name":"جنگلی جلگه ای"},{"id":271,"name":"خیریه"},{"id":272,"name":"تجهیزات شهری"},{"id":273,"name":"معبر و خیابان"},{"id":274,"name":"ملی انفالی"},{"id":275,"name":"معبر"},{"id":276,"name":"کودکستان"},{"id":277,"name":"دبستان"},{"id":278,"name":"پست گاز"},{"id":279,"name":"مجتمع گردشگری"},{"id":280,"name":"رادیولوژی"},{"id":281,"name":"دندان پزشکی"},{"id":282,"name":"دندانسازی"},{"id":283,"name":"آپارتمان مسکونی موقت"},{"id":284,"name":"اراضی ملی واگذار شده"},{"id":285,"name":"داروخانه"},{"id":286,"name":"مرکز زباله"},{"id":287,"name":"آتش نشانی"},{"id":288,"name":"کلانتری"},{"id":289,"name":"مهمانسرا"},{"id":290,"name":"اغذیه فروشی"},{"id":291,"name":"چلوکبابی"},{"id":292,"name":"پایانه مسافری"},{"id":293,"name":"فرودگاه"},{"id":294,"name":"کنیسه"},{"id":295,"name":"تماشاخانه"},{"id":296,"name":"خانه بهداشت"}];
const usageTypes = [{"id":1,"name":"مسکونی"},{"id":2,"name":"اداری"},{"id":3,"name":"تجاری"},{"id":4,"name":"صنعتی"},{"id":5,"name":"زراعی-باغ"},{"id":6,"name":"ورزشی"},{"id":7,"name":"فضای سبز"},{"id":8,"name":"مذهبی"},{"id":9,"name":"ویلایی"},{"id":10,"name":"اداری-دولتی"},{"id":11,"name":"لشگری و کشوری"},{"id":12,"name":"معدن"},{"id":13,"name":"حمل و نقل"},{"id":14,"name":"فرهنگی و مذهبی"},{"id":15,"name":"بهداشتی درمانی"},{"id":16,"name":"تجهیزات شهری"},{"id":17,"name":"فاقد کاربری"},{"id":18,"name":"گردشگری"},{"id":19,"name":"تفریحی گردشگری"},{"id":20,"name":"مختلط"},{"id":21,"name":"آموزشی"},{"id":22,"name":"اراضی مزروعی"},{"id":23,"name":"بهداشتی"},{"id":24,"name":"پارک جنگلی"},{"id":25,"name":"پارکینگ"},{"id":26,"name":"پرورش گل و گیاه"},{"id":27,"name":"تاسیسات شهری"},{"id":28,"name":"حریم قانونی"},{"id":29,"name":"خدماتی(انتفاعی و غیر انتفاعی)"},{"id":30,"name":"درمانی"},{"id":31,"name":"صنعتی کارگاهی"},{"id":32,"name":"طبیعی"},{"id":33,"name":"طرح های بخش کشاورزی"},{"id":34,"name":"فضای سبز و باز"},{"id":35,"name":"مسکونی ویژه"},{"id":36,"name":"میراث تاریخی"},{"id":37,"name":"نظامی"},{"id":38,"name":"تجارتی-اقامتی"}];
const jointTypes = [{"code":1,"title":"پاركینگ","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":2,"title":"انباری","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":3,"title":"بالكن","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":4,"title":"بالكن شمالی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":5,"title":"بالكن شرقی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":6,"title":"بالكن جنوبی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":7,"title":"بالكن غربی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":8,"title":"نیم طبقه فوقانی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":9,"title":"نیم طبقه تحتانی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":10,"title":"سرویس","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":11,"title":"حیاط اختصاصی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":12,"title":"پشت بام اختصاصی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":13,"title":"حیاط خلوت","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":14,"title":"تراس شمالی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":15,"title":"تراس شرقی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":16,"title":"تراس جنوبی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":17,"title":"تراس غربی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":18,"title":"تراس","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":19,"title":"زیرزمین اختصاصی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":20,"title":"راه پله اختصاصی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":21,"title":"پاسیو","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":22,"title":"داكت اختصاصی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":24,"title":"نورگیر","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":25,"title":"هواكش","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":26,"title":"ورودی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":27,"title":"راه عبور","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":29,"title":"موتورخانه","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":32,"title":"سرویس بهداشتی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":33,"title":"آب انبار","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":43,"title":"پیلوت","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":52,"title":"راه پله","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":53,"title":"راهرو دالان","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":55,"title":"زیرزمین","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":62,"title":"قریه","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":75,"title":"محوطه","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":80,"title":"بالكن دوبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":81,"title":"بالكن شمالی دوبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":82,"title":"بالكن شرقی دوبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":83,"title":"بالكن جنوبی دوبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":84,"title":"بالكن غربی دوبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":85,"title":"نیم طبقه فوقانی دوبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":86,"title":"نیم طبقه تحتانی دوبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":87,"title":"تراس شمالی دوبلكس","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":88,"title":"تراس شرقی دوبلكس","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":89,"title":"تراس جنوبی دوبلكس","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":90,"title":"تراس غربی دوبلكس","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":91,"title":"تراس دوبلكس","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":92,"title":"بالكن تریبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":93,"title":"بالكن شمالی تریبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":94,"title":"بالكن شرقی تریبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":95,"title":"بالكن جنوبی تریبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":96,"title":"بالكن غربی تریبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":97,"title":"نیم طبقه فوقانی تریبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":98,"title":"نیم طبقه تحتانی تریبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":99,"title":"تراس شمالی تریبلكس","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":100,"title":"تراس شرقی تریبلكس","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":101,"title":"تراس جنوبی تریبلكس","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":102,"title":"تراس غربی تریبلكس","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":103,"title":"تراس تریبلكس","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":104,"title":"بالكن كواتروپلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":105,"title":"بالكن شمالی كواترروپلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":106,"title":"بالكن شرقی كواتروپلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":107,"title":"بالكن جنوبی كواتروپلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":108,"title":"بالكن غربی كواتروپلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":109,"title":"نیم طبقه فوقانی كواتروپلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":110,"title":"نیم طبقه تحتانی كواتروپلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":111,"title":"تراس شمالی كواتروپلكس","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":112,"title":"تراس شرقی كواتروپلكس","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":113,"title":"تراس جنوبی كواتروپلكس","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":114,"title":"تراس غربی كواتروپلكس","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":115,"title":"تراس كواتروپلكس","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":117,"title":"صحن خانه","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":121,"title":"داكت","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":122,"title":"فضای مشاعی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":123,"title":"آسانسور","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":124,"title":"بالكن مسقف","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":125,"title":"بالكن مسقف شمالی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":126,"title":"بالكن مسقف شرقی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":127,"title":"بالكن مسقف جنوبی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":128,"title":"بالكن مسقف غربی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":129,"title":"تراس مسقف شمالی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":130,"title":"تراس مسقف شرقی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":131,"title":"تراس مسقف جنوبی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":132,"title":"تراس مسقف غربی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":133,"title":"تراس مسقف","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":134,"title":"بالكن مسقف دوبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":135,"title":"بالكن شمالی مسقف دوبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":136,"title":"بالكن شرقی مسقف دوبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":137,"title":"بالكن جنوبی مسقف دوبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":138,"title":"بالكن غربی مسقف دوبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":139,"title":"تراس شمالی مسقف دوبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":140,"title":"تراس شرقی مسقف دوبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":141,"title":"تراس جنوبی مسقف دوبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":142,"title":"تراس غربی مسقف دوبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":143,"title":"دوبلكس آپارتمان","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":144,"title":"بالكن مسقف تریبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":145,"title":"بالكن شمالی مسقف تریبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":146,"title":"بالكن شرقی مسقف تریبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":147,"title":"بالكن جنوبی مسقف تریبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":148,"title":"بالكن غربی مسقف تریبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":151,"title":"تراس شمالی مسقف تریبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":152,"title":"تراس شرقی مسقف تریبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":153,"title":"تریبلكس آپارتمان","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":154,"title":"تراس غربی مسقف تریبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":155,"title":"تراس مسقف تریبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":156,"title":"بالكن مسقف كواتروپلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":157,"title":"بالكن شمالی مسقف كواترروپلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":158,"title":"بالكن شرقی مسقف كواتروپلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":159,"title":"بالكن جنوبی مسقف كواتروپلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":160,"title":"بالكن غربی مسقف كواتروپلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":162,"title":"آپارتمان فرهنگی غیر قابل تفكیك","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":163,"title":"تراس شمالی مسقف كواتروپلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":164,"title":"تراس شرقی مسقف كواتروپلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":165,"title":"كواتروپلكس آپارتمان","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":166,"title":"تراس غربی مسقف كواتروپلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":167,"title":"تراس مسقف كواتروپلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":168,"title":"واحد خدماتی غیر قابل تفكیك","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":169,"title":"زیر پله مشاعی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":170,"title":"زیر پله منضم","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":171,"title":"واحد خدماتی غیرقابل تفكیك","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":173,"title":"بالكن اداری","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":176,"title":"باحق دسترسی به تراس شمالی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":177,"title":"باحق دسترسی به تراس شرقی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":178,"title":"باحق دسترسی به تراس جنوبی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":179,"title":"باحق دسترسی به تراس غربی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":182,"title":"بالکن غیر مسقف","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":183,"title":"انباری داخلی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":184,"title":"جزء اصلاح آتی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":185,"title":"حمام منضم","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":195,"title":"رواق","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":196,"title":"واحد مسکونی منضم","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":198,"title":"انباری صنعتی منضم","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":200,"title":"حیاط مشاعی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":204,"title":"راه پله دوبلکس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":205,"title":"راه پله تریبلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":206,"title":"راه پله كواتروپلكس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":208,"title":"پشت بام","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":209,"title":"پیشرفتگی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":210,"title":"پاركینگ اختصاصی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":211,"title":"استخر","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":212,"title":"پیلوت مشاعی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":213,"title":"تاسیسات","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":214,"title":"تراس غیر مسقف مشاعی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":215,"title":"راه پله اضطراری","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":216,"title":"راه پله و تاسیسات","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":217,"title":"راهرو","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":218,"title":"سالن اجتماعات","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":219,"title":"سرایداری","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":220,"title":"سونا","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":221,"title":"كانال","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":222,"title":"كانال كولر","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":223,"title":"لابی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":224,"title":"محوطه بازی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":225,"title":"محوطه پاركینگ","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":226,"title":"محوطه مشاعی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":227,"title":"محوطه ورزشی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":228,"title":"نورگیر مشاعی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":229,"title":"ورودی ساختمان","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":230,"title":"انباری تجاری","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":231,"title":"پاركینگ تجاری","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":233,"title":"اصلاحی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":234,"title":"سطح دارای اختلاف ارتفاع 20 سانتی متری از كف واحد","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":235,"title":"سطح دارای اختلاف ارتفاع 30 سانتی متری از كف واحد","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":236,"title":"سطح دارای اختلاف ارتفاع 40 سانتی متری از كف واحد","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":237,"title":"سطح دارای اختلاف ارتفاع 50 سانتی متری از كف واحد","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":238,"title":"سطح دارای اختلاف ارتفاع 60 سانتی متری از كف واحد","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":239,"title":"سطح دارای اختلاف ارتفاع 70 سانتی متری از كف واحد","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":240,"title":"سطح دارای اختلاف ارتفاع 80 سانتی متری از كف واحد","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":241,"title":"سطح دارای اختلاف ارتفاع 90 سانتی متری از كف واحد","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":242,"title":"سطح دارای اختلاف ارتفاع 100 سانتی متری از كف واحد","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":243,"title":"سطح دارای اختلاف ارتفاع 110 سانتی متری از كف واحد","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":244,"title":"سطح دارای اختلاف ارتفاع 120 سانتی متری از كف واحد","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":245,"title":"سطح دارای اختلاف ارتفاع 130 سانتی متری از كف واحد","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":246,"title":"سطح شیبدار","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":247,"title":"بالكن پیشرفتگی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":248,"title":"بالكن و بالكن پیشرفته","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":249,"title":"درز انقطاع","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":250,"title":"راه پله فرار","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":256,"title":"قسمتی از ملك كه رها شده است","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":257,"title":"قسمت تصرف غیر مالكانه","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":258,"title":"ستون","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":259,"title":"قسمت تحتانی گذر","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":260,"title":"قسمت پر عرصه","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":262,"title":"پاركینگ مزاحم","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":263,"title":"تراس مشاعی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":264,"title":"ایوان","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":265,"title":"نگهبانی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":268,"title":"نیم بالكن","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":271,"title":"راه پله و آسانسور مشاعی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":274,"title":"غیر مسقف","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":275,"title":"عقب نشینی با حفظ مالكیت","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":276,"title":"رمپ","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":278,"title":"جك معلولین","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":279,"title":"بالكن تجاری","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":280,"title":"راه پله و آسانسور","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":281,"title":"بالكن داخلی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":282,"title":"تراس كف اشتراكی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":284,"title":"تراس مسقف","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":285,"title":"تراس غیر مسقف","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":286,"title":"راه پله مشاعی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":287,"title":"راه پله داخلی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":289,"title":"خرپشته","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":290,"title":"شوتینگ","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":291,"title":"كانال زباله","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":292,"title":"در مسیر تعریضی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":293,"title":"واقع در حیاط مشاعی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":294,"title":"بصورت غیر مسقف","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":296,"title":"اسانسور اختصاصی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":297,"title":"راه پله و راهرو","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":298,"title":"جاگلدانی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":299,"title":"انباری زیرپله","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":300,"title":"فضای رمپ","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":301,"title":"مكمل آپارتمان","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":302,"title":"توسعه آپارتمان","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":303,"title":"پله برقی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":304,"title":"جك بالابر برقی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":305,"title":"پاركینگ زیرزمین","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":307,"title":"مشاعات عمارت","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":308,"title":"محوطه مشاعی عمارت","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":309,"title":"صندوق خانه","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":310,"title":"سرویس اختصاصی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":311,"title":"عقب نشینی عرصه مشاعی با حفظ مالكیت","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":312,"title":"پاركینگ مسكونی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":313,"title":"پاركینگ اداری","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":314,"title":"انباری مسكونی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":315,"title":"انباری اداری","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":316,"title":"جزیی اصلاحی آتی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":317,"title":"انبار عمومی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":318,"title":"انباری مشاعی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":319,"title":"نماز خانه","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":320,"title":"اتاق تاسیسات برقی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":321,"title":"اتاق تاسیسات مخابراتی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":322,"title":"بهارخواب منضم","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":323,"title":"منبع اب","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":324,"title":"اتاق منضم","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":325,"title":"محوطه باز مشاعی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":334,"title":"راه  پله","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":335,"title":"مستر اح","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":336,"title":"مدبخ مشاعی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":337,"title":"سرویس مشاعی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":338,"title":"دالان مشاعی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":339,"title":"حوض مشاعی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":344,"title":"سالن اجتماعات","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":346,"title":"تراس غیر مسقف منضم","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":349,"title":"پاركینگ مزاحم اداری","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":350,"title":"انباری خدماتی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":351,"title":"اتاق جک","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":352,"title":"انباری بهداشتی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":353,"title":"اتاق آتشنشانی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":354,"title":"بام زیرزمین","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":355,"title":"فضای داخلی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":357,"title":"سرویس اختصاصی منضم","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":358,"title":"دفتركار","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":360,"title":"مغازه غیرقابل تفكیك","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":361,"title":"مغازه منضم غیرقابل تفكیك","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":362,"title":"مغازه منضم","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":363,"title":"محوطه و فضای باز مشاعی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":364,"title":"جارو مركزی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":365,"title":"سالن ورزشی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":369,"title":"انباری تجاری منضم","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":370,"title":"واحد تجاری منضم","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":371,"title":"تراس اختصاصی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":374,"title":"آشپزخانه منضم","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":378,"title":"پاركینگ غیر مسقف","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":379,"title":"پاركینگ واقع در حیاط","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":380,"title":"مكمل تجاری","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":381,"title":"بالكن تجاری داخلی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":382,"title":"بالكن تجاری منضم","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":383,"title":"استخروسونای مشاعی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":386,"title":"مكمل هتل","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":388,"title":"سرویس بهداشتی تجاری","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":389,"title":"سرویس بهداشتی تجاری اختصاصی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":390,"title":"استخر و سونا","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":393,"title":"فضای سبز مشاعی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":394,"title":"حمام مشاع","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":396,"title":"پست گاز","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":397,"title":"اتاق تاسیسات گازی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":398,"title":"آلاچیق منضم","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":399,"title":"آلاچیق مشاع","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":400,"title":"جا گلدانی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":401,"title":"چهاردیواری مخصوص آسانسور","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":402,"title":"اتاق آسانسور","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":404,"title":"باحق دسترسی به تراس غیر مسقف","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":405,"title":"باحق دسترسی به تراس","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":406,"title":"پاركینگ معلول","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":407,"title":"پاركینگ مسكونی مزاحم","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":408,"title":"پاركینگ تجاری مزاحم","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":409,"title":"پاركینگ معلول مزاحم","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":410,"title":"بالكن تجاری","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":411,"title":"انباری مسكونی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":414,"title":"محوطه تجاری","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":415,"title":"محوطه  تجاری","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":417,"title":"سالن  ورزشی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":418,"title":"باشگاه  ورزشی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":422,"title":"بالكن و بالكن پیشرفته شمالی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":423,"title":"بالكن و بالكن پیشرفته شرقی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":424,"title":"بالكن و بالكن پیشرفته جنوبی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":425,"title":"بالكن و بالكن پیشرفته غربی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":428,"title":"مجموعه ورزشی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":429,"title":"تاسیسات اختصاصی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":430,"title":"فضای بازی كودكان","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":442,"title":"سونا و جكوزی اختصاصی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":454,"title":"پست برق","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":458,"title":"طی شورخانه","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":459,"title":"ورودی اختصاصی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":460,"title":"ورودی  اختصاصی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":461,"title":"سونا و جكوزی مشاعی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":462,"title":"فضای پشت بام","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":463,"title":"فضای عرصه","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":467,"title":"طبقه منضم","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":468,"title":"طبقه مكمل","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":470,"title":"پاركینگ غیر مسقف تجاری","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":471,"title":"پاركینگ غیر مسقف مسكونی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":472,"title":"پیشرفتگی در طرح اصلاح آتی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":473,"title":"دفتر مدیریت","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":475,"title":"فضای تجاری","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":476,"title":"مسجد.","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":479,"title":"ناهار خوری","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":480,"title":"آبدارخانه","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":481,"title":"قسمت پر حیاط","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":483,"title":"مدیریت ساختمان","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":484,"title":"بالكن واقع در طرح اصلاح آتی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":485,"title":"پاركینگ واقع در طرح اصلاح آتی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":486,"title":"انباری واقع در طرح اصلاح آتی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":487,"title":"بام همکف","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":492,"title":"پله","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":493,"title":"پارکینگ مزاحم واقع در حیاط","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":494,"title":"بصورت مسقف","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":495,"title":"نورگیر دوبلکس","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":496,"title":"رختشوی خانه","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":497,"title":"رختشوی خانه","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":500,"title":"تاسیسات فنی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":501,"title":"دفتر اداری","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":502,"title":"رختکن  مشاعی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":509,"title":"انبار تولیدی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":510,"title":"مجتمع فرهنگی هنری","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":511,"title":"درمانگاه","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":512,"title":"مجتمع آموزشی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":513,"title":"باشگاه ورزشی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":514,"title":"دوبلکس تجاری-اداری","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":515,"title":"خانه ویلایی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":517,"title":"دارای سقف شیب دار","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":518,"title":"انباری مسکونی منضم","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":519,"title":"اتاق مانیتورینگ","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":521,"title":"نمای احداثی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":522,"title":"دوبلکس تجاری","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":523,"title":"دوبلکس اداری","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":524,"title":"آسانسور داخلی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":525,"title":"فضای آسانسور داخلی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":526,"title":"جک بالابر داخلی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":527,"title":"فضای جک بالابر داخلی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":528,"title":"پارکینگ مهمان","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":531,"title":"کتابخانه","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":532,"title":"کتابخانه","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":533,"title":"پارکینگ صنعتی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":535,"title":"پاركینگ با كاربری ورزشی و تفریحی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":537,"title":"استخر","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":538,"title":"دفتر کار منضم غیر قابل تفکیک","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":539,"title":"طی شورخانه","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":540,"title":"پارکینگ مزاحم تفریحی و ورزشی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":541,"title":"آسانسور تفریحی و ورزشی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":542,"title":"تاسیسات تفریحی و ورزشی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":543,"title":"راه پله تفریحی و ورزشی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":545,"title":"انبار تفریحی و ورزشی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":546,"title":"راه پله تفریحی و ورزشی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":549,"title":"واحد صنعتی منضم","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":550,"title":"اتاقک واقع در خرپشته","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":551,"title":"واقع در حریم نهر","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":552,"title":"واقع در حریم رودخانه","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":553,"title":"پارکینگ مسکونی واقع در حیاط","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":554,"title":"پارکینگ تجاری واقع در حیاط","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":555,"title":"پارکینگ اداری واقع در حیاط","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":556,"title":"واحد خدماتی","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"},{"code":557,"title":"گلخانه مشاعی","kimdPieceCode":1,"kimdPieceTitle":"مشاعاتی"},{"code":561,"title":"انبار دفتر کار","kimdPieceCode":2,"kimdPieceTitle":"منضماتی"}];

// === توابع کمکی ===

function setDeep(obj, path, value) {
  if (path.length === 0) return value;
  const key = path[0];
  const isArray = Array.isArray(obj);
  const clone = isArray ? [...obj] : { ...obj };
  
  clone[key] = setDeep(
    clone[key] !== undefined ? clone[key] : (typeof path[1] === 'number' ? [] : {}),
    path.slice(1),
    value
  );
  return clone;
}

// این تابع پس از هر تغییری فراخوانی می‌شود تا مساحت‌ها و تعداد واحدهای طبقات را مجدداً به صورت خودکار محاسبه کند.
function recalculateData(dataObj) {
  if (!dataObj || !dataObj.Block) return dataObj;
  const clonedObj = { ...dataObj };
  clonedObj.Block = clonedObj.Block.map(block => {
    if (!block.Class) return block;
    const newClass = block.Class.map(cls => {
      const units = cls.EstateUnits || [];
      const classUnitNo = units.length;
      // جمع مساحت تمام واحدها
      const classArea = units.reduce((sum, unit) => sum + (parseFloat(unit.UnitArea) || 0), 0);
      return {
        ...cls,
        ClassUnitNo: classUnitNo,
        ClassArea: Math.round(classArea * 100) / 100 // گرد کردن به 2 رقم اعشار
      };
    });
    return {
      ...block,
      Class: newClass
    };
  });
  return clonedObj;
}

// === کامپوننت‌های فرم و گرافیکی ===

const InputField = ({ label, value, onChange, type = "text", className = "", disabled = false }) => (
  <div className={`flex flex-col ${className}`}>
    <label className="mb-1.5 text-xs font-semibold text-slate-500">{label}</label>
    <input
      type={type}
      value={value !== undefined && value !== null ? value : ""}
      onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
      disabled={disabled}
      className={`px-3 py-2 border border-slate-200 rounded-lg focus:outline-none transition-all text-sm placeholder-slate-400 ${disabled ? 'bg-slate-100 text-slate-500 cursor-not-allowed opacity-80' : 'bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800'}`}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options, className = "", optionIdKey = "id", optionNameKey = "name", optionGroupKey = null }) => (
  <div className={`flex flex-col ${className}`}>
    <label className="mb-1.5 text-xs font-semibold text-slate-500">{label}</label>
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm text-slate-800"
    >
      <option value="">انتخاب کنید...</option>
      {options.map(opt => (
        <option key={opt[optionIdKey]} value={opt[optionIdKey].toString()}>
          {opt[optionIdKey]} - {opt[optionNameKey]} {optionGroupKey && opt[optionGroupKey] ? `(${opt[optionGroupKey]})` : ''}
        </option>
      ))}
    </select>
  </div>
);

const CoordinateEditor = ({ coordinates, onChange }) => {
  const points = (Array.isArray(coordinates) && coordinates.length > 0 && Array.isArray(coordinates[0])) ? coordinates[0] : [];

  const updatePoint = (index, axis, value) => {
    const newPoints = [...points];
    if (!newPoints[index]) newPoints[index] = [0, 0];
    else newPoints[index] = [...newPoints[index]];
    newPoints[index][axis] = value === '' ? '' : Number(value);
    onChange([newPoints]);
  };

  const addPoint = () => onChange([[...points, [0, 0]]]);
  
  const removePoint = (index) => {
    const newPoints = points.filter((_, i) => i !== index);
    onChange([newPoints]);
  };

  return (
    <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
      <div className="flex justify-between items-center mb-3 border-b border-slate-200 pb-3">
        <span className="text-sm font-bold text-slate-700">مختصات نقشه (GeoJSON)</span>
        <button type="button" onClick={addPoint} className="text-xs bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-600 px-3 py-1.5 rounded-lg font-bold transition-colors">
          + افزودن نقطه
        </button>
      </div>
      {points.length === 0 ? (
        <div className="text-xs text-slate-400 text-center py-6 border border-dashed border-slate-200 rounded-lg bg-white">نقطه‌ای ثبت نشده است</div>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {points.map((pt, i) => (
            <div key={i} className="flex gap-2 items-center bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
              <span className="text-xs font-bold text-slate-400 w-6 text-center">{i + 1}</span>
              <input type="number" placeholder="X" value={pt[0]} onChange={(e) => updatePoint(i, 0, e.target.value)} className="w-1/2 px-2 py-1.5 border border-slate-200 rounded-md text-xs focus:ring-2 focus:ring-blue-500 outline-none text-center" dir="ltr" />
              <input type="number" placeholder="Y" value={pt[1]} onChange={(e) => updatePoint(i, 1, e.target.value)} className="w-1/2 px-2 py-1.5 border border-slate-200 rounded-md text-xs focus:ring-2 focus:ring-blue-500 outline-none text-center" dir="ltr" />
              <button type="button" onClick={() => removePoint(i)} className="text-red-400 hover:text-red-600 p-1.5 rounded-md transition-colors">
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// آیکون‌ها
const TrashIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

const FolderIcon = ({ className = "w-4 h-4", open }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    {open ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
    )}
  </svg>
);

const FileIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

const ExpandIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
  </svg>
);

const CollapseIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
  </svg>
);

const MapIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
  </svg>
);

// این دو کامپوننت حتما باید خارج از کامپوننت اصلی تعریف شوند تا از بین نروند.
const ContentWrapper = ({ title, children, action }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
    <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3 shrink-0">
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      {action ? <div>{action}</div> : null}
    </div>
    <div className="flex-1 overflow-y-auto pr-2 pb-6 min-h-0">
       {children}
    </div>
  </div>
);

const ConfirmModal = ({ isOpen, title, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 transition-all transform scale-100">
        <div className="flex items-center gap-3 text-red-500 mb-4">
          <div className="p-3 bg-red-100 rounded-full">
            <TrashIcon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">تایید حذف</h3>
        </div>
        <p className="text-slate-600 mb-6 text-sm leading-relaxed">
          آیا از حذف <strong className="text-slate-800">{title}</strong> اطمینان دارید؟ این عملیات قابل بازگشت نیست.
        </p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">انصراف</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-sm shadow-red-200">بله، حذف شود</button>
        </div>
      </div>
    </div>
  );
};

// === کامپوننت اصلی ===

export default function EstateManagementForm() {
  const [data, setData] = useState(() => recalculateData(initialData));
  
  // State for tracking active view
  const [activeNode, setActiveNode] = useState({ type: 'BASE' });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, type: null, pathParams: null, title: '' });
  
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState({ type: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [planMessage, setPlanMessage] = useState('');
  
  // To keep track of expanded folders in tree
  const [expandedNodes, setExpandedNodes] = useState({ blocks: true, plansRoot: true, plansList: true }); 

  const handleChange = (path, value) => {
    setData((prev) => {
      const updated = setDeep(prev, path, value);
      // تمامی آپدیت‌ها از محاسبه‌گر خودکار عبور می‌کنند
      return recalculateData(updated);
    });
  };

  const toggleExpand = (key) => {
    setExpandedNodes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExpandAll = () => {
    const nextState = { blocks: true, plansRoot: true, plansList: true };
    data.Block.forEach((b, bIdx) => {
      nextState[`b${bIdx}`] = true;
      b.Class.forEach((c, cIdx) => {
        nextState[`b${bIdx}c${cIdx}`] = true;
        nextState[`units_b${bIdx}c${cIdx}`] = true;
        nextState[`joints_b${bIdx}c${cIdx}`] = true;
      });
    });
    setExpandedNodes(nextState);
  };

  const handleCollapseAll = () => {
    setExpandedNodes({});
  };

  const getSummary = () => {
    const totalBlocks = data.Block.length;
    let totalClasses = 0;
    let totalUnits = 0;
    let totalJoints = 0;
    const jointTypesCount = {};

    data.Block.forEach(b => {
      totalClasses += b.Class.length;
      b.Class.forEach(c => {
        totalUnits += (c.EstateUnits?.length || 0);
        totalJoints += (c.Joint?.length || 0);
        c.Joint?.forEach(j => {
          const typeName = jointTypes.find(jt => jt.code.toString() === j.Code?.toString())?.title || 'نامشخص';
          jointTypesCount[typeName] = (jointTypesCount[typeName] || 0) + 1;
        });
      });
    });

    return { totalBlocks, totalClasses, totalUnits, totalJoints, jointTypesCount };
  };

  const isNodeActive = (type, bIdx, cIdx, itemIdx) => {
    if (activeNode.type !== type) return false;
    if (bIdx !== undefined && activeNode.bIdx !== bIdx) return false;
    if (cIdx !== undefined && activeNode.cIdx !== cIdx) return false;
    if (type === 'UNIT' && activeNode.uIdx !== itemIdx) return false;
    if (type === 'JOINT' && activeNode.jIdx !== itemIdx) return false;
    if (type === 'PLAN_UNIT' && activeNode.pIdx !== itemIdx) return false;
    return true;
  };

  const requestDelete = (type, pathParams, title) => {
    setDeleteModal({ isOpen: true, type, pathParams, title });
  };

  const executeDelete = () => {
    const { type, pathParams } = deleteModal;
    if (type === 'owner') {
      handleChange(["OwnersInfo"], data.OwnersInfo.filter((_, i) => i !== pathParams.idx));
    } else if (type === 'block') {
      const newBlocks = data.Block.filter((_, i) => i !== pathParams.idx);
      handleChange(["Block"], newBlocks);
      handleChange(["TotalBlockNo"], newBlocks.length);
      setActiveNode({ type: 'BASE' });
    } else if (type === 'class') {
      const newClasses = data.Block[pathParams.bIdx].Class.filter((_, i) => i !== pathParams.cIdx);
      handleChange(["Block", pathParams.bIdx, "Class"], newClasses);
      setActiveNode({ type: 'BLOCK', bIdx: pathParams.bIdx });
    } else if (type === 'unit') {
      const newUnits = data.Block[pathParams.bIdx].Class[pathParams.cIdx].EstateUnits.filter((_, i) => i !== pathParams.uIdx);
      handleChange(["Block", pathParams.bIdx, "Class", pathParams.cIdx, "EstateUnits"], newUnits);
      setActiveNode({ type: 'CLASS', bIdx: pathParams.bIdx, cIdx: pathParams.cIdx });
    } else if (type === 'joint') {
      const newJoints = data.Block[pathParams.bIdx].Class[pathParams.cIdx].Joint.filter((_, i) => i !== pathParams.jIdx);
      handleChange(["Block", pathParams.bIdx, "Class", pathParams.cIdx, "Joint"], newJoints);
      setActiveNode({ type: 'CLASS', bIdx: pathParams.bIdx, cIdx: pathParams.cIdx });
    } else if (type === 'unitPlan') {
      handleChange(["UnitPlans"], data.UnitPlans.filter((_, i) => i !== pathParams.idx));
      setActiveNode({ type: 'PLANS_OVERVIEW' });
    }
    setDeleteModal({ isOpen: false, type: null, pathParams: null, title: '' });
  };

  const addBlock = (e) => {
    e.stopPropagation();
    const newBlock = { BlockNo: data.Block.length + 1, BlockName: "", StructureType: 1, Limitation: "", Class: [] };
    handleChange(["Block"], [...data.Block, newBlock]);
    handleChange(["TotalBlockNo"], data.Block.length + 1);
    setActiveNode({ type: 'BLOCK', bIdx: data.Block.length });
    setExpandedNodes(p => ({ ...p, blocks: true, [`b${data.Block.length}`]: true }));
  };

  const addClass = (e, bIdx) => {
    e.stopPropagation();
    const newClass = { ClassNo: data.Block[bIdx].Class.length, ClassUnitNo: 0, ClassArea: 0, EstateUnits: [], Joint: [] };
    handleChange(["Block", bIdx, "Class"], [...data.Block[bIdx].Class, newClass]);
    setActiveNode({ type: 'CLASS', bIdx, cIdx: data.Block[bIdx].Class.length });
    setExpandedNodes(p => ({ ...p, [`b${bIdx}`]: true, [`b${bIdx}c${data.Block[bIdx].Class.length}`]: true }));
  };

  const addUnit = (bIdx, cIdx) => {
    let maxUnitNo = 0;
    data.Block.forEach(b => b.Class.forEach(c => c.EstateUnits?.forEach(u => {
      const no = parseInt(u.EstateUnitNo) || 0;
      if (no > maxUnitNo) maxUnitNo = no;
    })));
    const currentUnits = data.Block[bIdx].Class[cIdx].EstateUnits || [];
    const newUnit = { EstateUnitNo: maxUnitNo + 1, UnitArea: 0, Usage: "1", Limitation: "" };
    handleChange(["Block", bIdx, "Class", cIdx, "EstateUnits"], [...currentUnits, newUnit]);
    setActiveNode({ type: 'UNIT', bIdx, cIdx, uIdx: currentUnits.length });
    setExpandedNodes(prev => ({ ...prev, [`units_b${bIdx}c${cIdx}`]: true }));
  };

  const addJoint = (bIdx, cIdx) => {
    const currentJoints = data.Block[bIdx].Class[cIdx].Joint || [];
    let nextSector = "1";
    if (currentJoints.length > 0) {
      const maxSector = Math.max(...currentJoints.map(j => parseInt(j.Sector) || 0));
      nextSector = (maxSector + 1).toString();
    }
    const newJoint = { BlockNo: data.Block[bIdx].BlockNo, Code: "1", Area: 0, Usage: "1", Sector: nextSector, Limitation: "" };
    handleChange(["Block", bIdx, "Class", cIdx, "Joint"], [...currentJoints, newJoint]);
    setActiveNode({ type: 'JOINT', bIdx, cIdx, jIdx: currentJoints.length });
    setExpandedNodes(prev => ({ ...prev, [`joints_b${bIdx}c${cIdx}`]: true }));
  };

  const generateUnitPlans = () => {
    const currentPlans = [...(data.UnitPlans || [])];
    let added = 0;

    data.Block.forEach(block => {
      block.Class.forEach(cls => {
        cls.EstateUnits?.forEach(unit => {
          const exists = currentPlans.find(p =>
            Number(p.BlockNo) === Number(block.BlockNo) &&
            Number(p.ClassNo) === Number(cls.ClassNo) &&
            Number(p.EstateUnitNo) === Number(unit.EstateUnitNo)
          );
          if (!exists) {
            currentPlans.push({
              BlockNo: block.BlockNo,
              ClassNo: cls.ClassNo,
              EstateUnitNo: unit.EstateUnitNo,
              Type: "application/pdf",
              FileName: `file_${unit.EstateUnitNo}.pdf`,
              File: "",
              UnitMap: {
                Type: "FeatureCollection",
                Name: `واحد ${unit.EstateUnitNo}`,
                CoordinateReferenceSystem: { Type: "Feature", Properties: { Name: "EPSG:4326" } },
                Features: [{ Type: "Feature", Properties: {}, Geometry: { Type: "Polygon", Coordinates: [[]] } }]
              }
            });
            added++;
          }
        });
      });
    });

    if (added > 0) {
      handleChange(["UnitPlans"], currentPlans);
      setPlanMessage(`تعداد ${added} پلان جدید با موفقیت ایجاد و متصل شد.`);
      setTimeout(() => setPlanMessage(''), 4000);
    } else {
      setPlanMessage(`تمام واحدها از قبل دارای پلان هستند.`);
      setTimeout(() => setPlanMessage(''), 4000);
    }
  };

  const renderSidebar = () => {
    const baseItemClass = "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all text-sm font-semibold whitespace-nowrap mb-1";
    const activeClass = "bg-blue-50 text-blue-700 ring-1 ring-blue-200/50 shadow-sm";
    const inactiveClass = "text-slate-600 hover:bg-slate-100 hover:text-slate-900";

    return (
      <div className="w-full md:w-72 bg-white border-l border-slate-200 flex flex-col h-[300px] md:h-full rounded-xl md:rounded-none md:rounded-r-2xl shadow-sm overflow-hidden shrink-0">
        <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50 shrink-0">
          <div>
            <h2 className="font-bold text-slate-800">ساختار زمین</h2>
            <p className="text-[10px] text-slate-500 mt-1">ناوبری درختی فرم‌ها</p>
          </div>
          <div className="flex gap-1">
            <button onClick={handleExpandAll} className="p-1.5 bg-slate-200 text-slate-600 hover:bg-slate-300 hover:text-slate-800 rounded transition-colors" title="باز کردن همه درخت">
              <ExpandIcon className="w-3.5 h-3.5" />
            </button>
            <button onClick={handleCollapseAll} className="p-1.5 bg-slate-200 text-slate-600 hover:bg-slate-300 hover:text-slate-800 rounded transition-colors" title="بستن همه درخت">
              <CollapseIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-1 min-h-0" dir="rtl">
          {/* Main Nodes */}
          <div 
            className={`${baseItemClass} ${activeNode.type === 'BASE' ? activeClass : inactiveClass}`}
            onClick={() => setActiveNode({ type: 'BASE' })}
          >
            <FolderIcon open={activeNode.type === 'BASE'} className="w-4 h-4 text-slate-400" />
            اطلاعات پایه
          </div>
          <div 
            className={`${baseItemClass} ${activeNode.type === 'OWNERS' ? activeClass : inactiveClass}`}
            onClick={() => setActiveNode({ type: 'OWNERS' })}
          >
            <FolderIcon open={activeNode.type === 'OWNERS'} className="w-4 h-4 text-slate-400" />
            مالکین <span className="mr-auto bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded text-[10px]">{data.OwnersInfo.length}</span>
          </div>
          
          {/* Blocks Tree */}
          <div>
            <div 
              className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all mb-1 ${expandedNodes.blocks ? 'text-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
              onClick={() => toggleExpand('blocks')}
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FolderIcon open={expandedNodes.blocks} className="w-4 h-4 text-emerald-500" />
                بلوک‌ها
              </div>
              <button onClick={addBlock} className="p-1 hover:bg-emerald-100 text-emerald-600 rounded" title="افزودن بلوک">+</button>
            </div>
            
            {expandedNodes.blocks && (
              <div className="pr-4 border-r border-slate-100 mr-4 space-y-1">
                {data.Block.map((block, bIdx) => (
                  <div key={`tree-b${bIdx}`}>
                    <div 
                      className={`flex items-center justify-between ${baseItemClass} ${isNodeActive('BLOCK', bIdx) ? activeClass : inactiveClass}`}
                      onClick={() => setActiveNode({ type: 'BLOCK', bIdx })}
                    >
                      <div className="flex items-center gap-2" onClick={(e) => { e.stopPropagation(); toggleExpand(`b${bIdx}`); }}>
                        <FolderIcon open={expandedNodes[`b${bIdx}`]} className="w-4 h-4 text-slate-400" />
                        بلوک {block.BlockNo}
                      </div>
                      <div className="flex items-center gap-1">
                         <button onClick={(e) => addClass(e, bIdx)} className="p-1 hover:bg-blue-100 text-blue-500 rounded text-xs">+</button>
                      </div>
                    </div>
                    
                    {expandedNodes[`b${bIdx}`] && (
                      <div className="pr-4 border-r border-slate-100 mr-4 space-y-1">
                        {block.Class.map((cls, cIdx) => (
                          <div key={`tree-b${bIdx}c${cIdx}`}>
                            <div 
                              className={`flex items-center justify-between ${baseItemClass} py-1.5 ${isNodeActive('CLASS', bIdx, cIdx) ? activeClass : inactiveClass}`}
                              onClick={() => setActiveNode({ type: 'CLASS', bIdx, cIdx })}
                            >
                              <div className="flex items-center gap-2" onClick={(e) => { e.stopPropagation(); toggleExpand(`b${bIdx}c${cIdx}`); }}>
                                <FolderIcon open={expandedNodes[`b${bIdx}c${cIdx}`]} className="w-3.5 h-3.5 text-slate-400" />
                                طبقه {cls.ClassNo}
                              </div>
                            </div>
                            
                            {/* Units and Joints inside Class */}
                            {expandedNodes[`b${bIdx}c${cIdx}`] && (
                              <div className="pr-5 border-r border-slate-100 mr-4 space-y-0.5 mt-0.5 mb-1">
                                
                                {/* Units Folder */}
                                <div 
                                  className={`flex items-center justify-between px-3 py-1.5 rounded-md cursor-pointer transition-all text-xs font-medium ${expandedNodes[`units_b${bIdx}c${cIdx}`] ? 'text-slate-800' : 'text-slate-500 hover:bg-slate-50'}`}
                                  onClick={(e) => { e.stopPropagation(); toggleExpand(`units_b${bIdx}c${cIdx}`); }}
                                >
                                  <div className="flex items-center gap-2">
                                    <FolderIcon open={expandedNodes[`units_b${bIdx}c${cIdx}`]} className="w-3.5 h-3.5 text-indigo-400" />
                                    واحدها ({cls.EstateUnits?.length || 0})
                                  </div>
                                  <button onClick={(e) => { e.stopPropagation(); addUnit(bIdx, cIdx); }} className="p-1 hover:bg-indigo-100 text-indigo-500 rounded font-bold transition-colors">+</button>
                                </div>
                                {/* Individual Units */}
                                {expandedNodes[`units_b${bIdx}c${cIdx}`] && cls.EstateUnits?.map((unit, uIdx) => (
                                  <div 
                                    key={`u-${uIdx}`}
                                    className={`flex items-center gap-2 px-3 py-1.5 pr-8 rounded-md cursor-pointer transition-all text-xs font-medium ${isNodeActive('UNIT', bIdx, cIdx, uIdx) ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200/50' : 'text-slate-500 hover:bg-slate-50'}`}
                                    onClick={() => setActiveNode({ type: 'UNIT', bIdx, cIdx, uIdx })}
                                  >
                                    <FileIcon className="w-3.5 h-3.5" />
                                    واحد {unit.EstateUnitNo || uIdx + 1}
                                  </div>
                                ))}

                                {/* Joints Folder */}
                                <div 
                                  className={`flex items-center justify-between px-3 py-1.5 rounded-md cursor-pointer transition-all text-xs font-medium ${expandedNodes[`joints_b${bIdx}c${cIdx}`] ? 'text-slate-800' : 'text-slate-500 hover:bg-slate-50'}`}
                                  onClick={(e) => { e.stopPropagation(); toggleExpand(`joints_b${bIdx}c${cIdx}`); }}
                                >
                                  <div className="flex items-center gap-2">
                                    <FolderIcon open={expandedNodes[`joints_b${bIdx}c${cIdx}`]} className="w-3.5 h-3.5 text-amber-400" />
                                    مشاعات/منضمات ({cls.Joint?.length || 0})
                                  </div>
                                  <button onClick={(e) => { e.stopPropagation(); addJoint(bIdx, cIdx); }} className="p-1 hover:bg-amber-100 text-amber-500 rounded font-bold transition-colors">+</button>
                                </div>
                                {/* Individual Joints */}
                                {expandedNodes[`joints_b${bIdx}c${cIdx}`] && cls.Joint?.map((joint, jIdx) => (
                                  <div 
                                    key={`j-${jIdx}`}
                                    className={`flex items-center gap-2 px-3 py-1.5 pr-8 rounded-md cursor-pointer transition-all text-xs font-medium ${isNodeActive('JOINT', bIdx, cIdx, jIdx) ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/50' : 'text-slate-500 hover:bg-slate-50'}`}
                                    onClick={() => setActiveNode({ type: 'JOINT', bIdx, cIdx, jIdx })}
                                  >
                                    <FileIcon className="w-3.5 h-3.5" />
                                    قطعه {joint.Sector || jIdx + 1}
                                  </div>
                                ))}

                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {data.Block.length === 0 ? <div className="text-xs text-slate-400 py-2 pr-2">هیچ بلوکی ثبت نشده است</div> : null}
              </div>
            )}
          </div>

          <div className="my-2 border-t border-slate-100 shrink-0"></div>

          <div>
            <div 
              className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all mb-1 ${expandedNodes.plansRoot ? 'text-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
              onClick={() => toggleExpand('plansRoot')}
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FolderIcon open={expandedNodes.plansRoot} className="w-4 h-4 text-cyan-500" />
                پلان‌ها و نقشه‌ها
              </div>
            </div>
            
            {expandedNodes.plansRoot && (
              <div className="pr-4 border-r border-slate-100 mr-4 space-y-1">
                <div 
                  className={`${baseItemClass} py-1.5 ${isNodeActive('PLANS_OVERVIEW') ? activeClass : inactiveClass}`}
                  onClick={() => setActiveNode({ type: 'PLANS_OVERVIEW' })}
                >
                  <MapIcon className="w-3.5 h-3.5 text-slate-400" />
                  مدیریت و همگام‌سازی
                </div>

                <div 
                  className={`${baseItemClass} py-1.5 ${isNodeActive('PLAN_MAIN') ? activeClass : inactiveClass}`}
                  onClick={() => setActiveNode({ type: 'PLAN_MAIN' })}
                >
                  <FileIcon className="w-3.5 h-3.5 text-slate-400" />
                  نقشه اصلی (MainPlan)
                </div>

                <div 
                  className={`flex items-center justify-between px-3 py-1.5 rounded-md cursor-pointer transition-all text-xs font-medium ${expandedNodes.plansList ? 'text-slate-800' : 'text-slate-500 hover:bg-slate-50'}`}
                  onClick={() => toggleExpand('plansList')}
                >
                  <div className="flex items-center gap-2">
                    <FolderIcon open={expandedNodes.plansList} className="w-3.5 h-3.5 text-cyan-400" />
                    پلان‌ واحدها ({data.UnitPlans?.length || 0})
                  </div>
                </div>

                {expandedNodes.plansList && data.UnitPlans?.map((plan, pIdx) => (
                  <div 
                    key={`p-${pIdx}`}
                    className={`flex items-center gap-2 px-3 py-1.5 pr-8 rounded-md cursor-pointer transition-all text-xs font-medium ${isNodeActive('PLAN_UNIT', undefined, undefined, pIdx) ? 'bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200/50' : 'text-slate-500 hover:bg-slate-50'}`}
                    onClick={() => setActiveNode({ type: 'PLAN_UNIT', pIdx: pIdx })}
                  >
                    <FileIcon className="w-3.5 h-3.5" />
                    پلان بلوک {plan.BlockNo} ط {plan.ClassNo} و {plan.EstateUnitNo}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 shrink-0">
             <div 
              className={`${baseItemClass} ${activeNode.type === 'JSON' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              onClick={() => setActiveNode({ type: 'JSON' })}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>
              ورود و خروجی JSON
            </div>
          </div>

        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeNode.type) {
      case 'BASE':
        return (
          <ContentWrapper title="اطلاعات پایه ملک">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <InputField label="کد شناسه شهرداری" value={data.organId} onChange={(val) => handleChange(["organId"], val)} />
              <InputField label="شناسه یونیک درخواست" value={data.requestUniqueId} onChange={(val) => handleChange(["requestUniqueId"], val)} />
              <SelectField label="نوع ملک" value={data.EstateTypeCode} onChange={(val) => handleChange(["EstateTypeCode"], val)} options={estateTypes} />
              <InputField label="شماره تاییدیه" value={data.IssueNo} onChange={(val) => handleChange(["IssueNo"], val)} />
              <InputField label="تاریخ صدور" value={data.IssueDate} onChange={(val) => handleChange(["IssueDate"], val)} />
              <InputField label="کد جام ملک" value={data.JamCode} onChange={(val) => handleChange(["JamCode"], val)} />
              <InputField label="مساحت عرصه" value={data.Area} type="number" onChange={(val) => handleChange(["Area"], val)} />
              <div className="md:col-span-2 lg:col-span-3">
                <InputField label="آدرس کامل" value={data.Address} onChange={(val) => handleChange(["Address"], val)} />
              </div>
            </div>
          </ContentWrapper>
        );
      
      case 'OWNERS':
        return (
          <ContentWrapper 
            title="اطلاعات مالکین" 
            action={<button onClick={() => handleChange(["OwnersInfo"], [...data.OwnersInfo, { NationalNo: "", Type: "310103", Name: "", Family: "", BirthDate: "", FatherName: "", OwnersAddress: "", ElectronicEstateNoteNo: "", ContactNo: "" }])} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all">+ افزودن مالک</button>}
          >
            <div className="space-y-6">
              {data.OwnersInfo.map((owner, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-5 relative">
                  <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
                     <span className="font-bold text-slate-700">مالک {idx + 1}</span>
                     <button onClick={() => requestDelete('owner', { idx }, `مالک ${idx + 1}`)} className="text-red-500 hover:bg-red-100 p-1.5 rounded-md transition-colors"><TrashIcon /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField label="نام" value={owner.Name} onChange={(val) => handleChange(["OwnersInfo", idx, "Name"], val)} />
                    <InputField label="نام خانوادگی" value={owner.Family} onChange={(val) => handleChange(["OwnersInfo", idx, "Family"], val)} />
                    <InputField label="کد ملی" value={owner.NationalNo} onChange={(val) => handleChange(["OwnersInfo", idx, "NationalNo"], val)} />
                    <InputField label="شماره موبایل" value={owner.ContactNo} onChange={(val) => handleChange(["OwnersInfo", idx, "ContactNo"], val)} />
                    <InputField label="تاریخ تولد" value={owner.BirthDate} onChange={(val) => handleChange(["OwnersInfo", idx, "BirthDate"], val)} />
                    <InputField label="نام پدر" value={owner.FatherName} onChange={(val) => handleChange(["OwnersInfo", idx, "FatherName"], val)} />
                  </div>
                </div>
              ))}
              {data.OwnersInfo.length === 0 ? <p className="text-center text-slate-400 py-10">هیچ مالکی ثبت نشده است</p> : null}
            </div>
          </ContentWrapper>
        );

      case 'BLOCK': {
        const bIdx = activeNode.bIdx;
        const block = data.Block[bIdx];
        if(!block) return null;
        return (
          <ContentWrapper 
            title={`مشخصات بلوک ${block.BlockNo}`}
            action={<button onClick={() => requestDelete('block', { idx: bIdx }, `بلوک ${block.BlockNo}`)} className="text-red-500 text-sm font-bold bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-all">حذف بلوک</button>}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
              <InputField label="نام بلوک" value={block.BlockName} onChange={(val) => handleChange(["Block", bIdx, "BlockName"], val)} />
              <SelectField label="نوع سازه" value={block.StructureType} onChange={(val) => handleChange(["Block", bIdx, "StructureType"], val)} options={[{id: 1, name: "فلزی"}, {id: 2, name: "بتنی"}, {id: 3, name: "مصالح بنایی"}]} />
              <div className="md:col-span-2">
                <InputField label="محدوده (Limitation)" value={block.Limitation} onChange={(val) => handleChange(["Block", bIdx, "Limitation"], val)} />
              </div>
            </div>
          </ContentWrapper>
        );
      }

      case 'CLASS': {
        const { bIdx, cIdx } = activeNode;
        const cls = data.Block[bIdx]?.Class[cIdx];
        if(!cls) return null;
        return (
          <ContentWrapper 
            title={`مشخصات طبقه ${cls.ClassNo} (بلوک ${data.Block[bIdx].BlockNo})`}
            action={<button onClick={() => requestDelete('class', { bIdx, cIdx }, `طبقه ${cls.ClassNo}`)} className="text-red-500 text-sm font-bold bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-all">حذف طبقه</button>}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl">
              <InputField label="شماره طبقه" value={cls.ClassNo} type="number" onChange={(val) => handleChange(["Block", bIdx, "Class", cIdx, "ClassNo"], val)} />
              <InputField label="تعداد واحدها (محاسبه خودکار)" value={cls.ClassUnitNo} type="number" disabled={true} onChange={() => {}} />
              <InputField label="مساحت طبقه (محاسبه خودکار)" value={cls.ClassArea} type="number" disabled={true} onChange={() => {}} />
            </div>
            
            <div className="mt-6 p-4 bg-blue-50/50 border border-blue-100 rounded-lg">
              <p className="text-xs text-blue-800 font-bold leading-relaxed flex items-center gap-2">
                <span className="text-lg">💡</span>
                توجه: مقادیر «تعداد واحدها» و «مساحت طبقه» به صورت کاملاً خودکار بر اساس واحدهای ثبت شده (EstateUnits) در این طبقه محاسبه می‌شوند و از ویرایش دستی آنها جلوگیری شده است تا خطای ریاضی در فرم‌ها رخ ندهد.
              </p>
            </div>
          </ContentWrapper>
        );
      }

      case 'UNIT': {
        const { bIdx, cIdx, uIdx } = activeNode;
        const unit = data.Block[bIdx]?.Class[cIdx]?.EstateUnits[uIdx];
        if(!unit) return null;
        return (
          <ContentWrapper 
            title={`مشخصات واحد ${unit.EstateUnitNo || uIdx + 1} (طبقه ${data.Block[bIdx].Class[cIdx].ClassNo})`}
            action={<button onClick={() => requestDelete('unit', { bIdx, cIdx, uIdx }, `واحد ${unit.EstateUnitNo || uIdx+1}`)} className="text-red-500 text-sm font-bold bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-all">حذف واحد</button>}
          >
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <InputField label="شماره واحد" value={unit.EstateUnitNo} type="number" onChange={(val) => handleChange(["Block", bIdx, "Class", cIdx, "EstateUnits", uIdx, "EstateUnitNo"], val)} />
                <InputField label="مساحت واحد" value={unit.UnitArea} type="number" onChange={(val) => handleChange(["Block", bIdx, "Class", cIdx, "EstateUnits", uIdx, "UnitArea"], val)} />
                <div className="md:col-span-2">
                  <SelectField label="کاربری" value={unit.Usage} onChange={(val) => handleChange(["Block", bIdx, "Class", cIdx, "EstateUnits", uIdx, "Usage"], val)} options={usageTypes} />
                </div>
                <div className="md:col-span-4">
                  <InputField label="حدود اربعه" value={unit.Limitation} onChange={(val) => handleChange(["Block", bIdx, "Class", cIdx, "EstateUnits", uIdx, "Limitation"], val)} />
                </div>
              </div>
            </div>
          </ContentWrapper>
        );
      }

      case 'JOINT': {
        const { bIdx, cIdx, jIdx } = activeNode;
        const joint = data.Block[bIdx]?.Class[cIdx]?.Joint[jIdx];
        if(!joint) return null;
        return (
          <ContentWrapper 
            title={`مشخصات منضم/مشاع قطعه ${joint.Sector || jIdx + 1} (طبقه ${data.Block[bIdx].Class[cIdx].ClassNo})`}
            action={<button onClick={() => requestDelete('joint', { bIdx, cIdx, jIdx }, `قطعه ${joint.Sector || jIdx+1}`)} className="text-red-500 text-sm font-bold bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-all">حذف قطعه</button>}
          >
            <div className="bg-amber-50/30 border border-amber-200 rounded-xl p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="md:col-span-2">
                  <SelectField label="نوع منضم/مشاع (Code)" value={joint.Code} onChange={(val) => handleChange(["Block", bIdx, "Class", cIdx, "Joint", jIdx, "Code"], val)} options={jointTypes} optionIdKey="code" optionNameKey="title" optionGroupKey="kimdPieceTitle" />
                </div>
                <InputField label="مساحت" value={joint.Area} type="number" onChange={(val) => handleChange(["Block", bIdx, "Class", cIdx, "Joint", jIdx, "Area"], val)} />
                <InputField label="شماره قطعه" value={joint.Sector} onChange={(val) => handleChange(["Block", bIdx, "Class", cIdx, "Joint", jIdx, "Sector"], val)} />
                <div className="md:col-span-2">
                   <SelectField label="کاربری" value={joint.Usage} onChange={(val) => handleChange(["Block", bIdx, "Class", cIdx, "Joint", jIdx, "Usage"], val)} options={usageTypes} />
                </div>
                <div className="md:col-span-2">
                   <InputField label="توضیحات" value={joint.Limitation} onChange={(val) => handleChange(["Block", bIdx, "Class", cIdx, "Joint", jIdx, "Limitation"], val)} />
                </div>
              </div>
            </div>
          </ContentWrapper>
        );
      }

      case 'PLANS_OVERVIEW':
        return (
          <ContentWrapper title="مدیریت و همگام‌سازی پلان‌ها">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm max-w-3xl">
              <h3 className="text-md font-bold text-slate-800 mb-4">عملیات گروهی پلان‌ها</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                در این بخش می‌توانید به ازای هر واحد ثبت شده در بلوک‌ها، یک رکورد پلان خالی (UnitPlan) ایجاد کنید. 
                اگر واحدی از قبل پلان داشته باشد، تغییری در آن ایجاد نمی‌شود.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <button onClick={generateUnitPlans} className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm transition-colors">
                  <MapIcon className="w-5 h-5" />
                  همگام‌سازی خودکار با واحدها
                </button>
                <button onClick={() => {
                  handleChange(["UnitPlans"], [...(data.UnitPlans||[]), { BlockNo: 1, ClassNo: 0, EstateUnitNo: 0, FileName: "", UnitMap: { Features: [{ Geometry: { Coordinates: [[]] } }] } }]);
                  setActiveNode({ type: 'PLAN_UNIT', pIdx: (data.UnitPlans?.length || 0) });
                  setExpandedNodes(prev => ({ ...prev, plansRoot: true, plansList: true }));
                }} className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm transition-colors">
                  + افزودن پلان دستی
                </button>
              </div>

              {planMessage ? (
                <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg font-bold flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {planMessage}
                </div>
              ) : null}
            </div>
          </ContentWrapper>
        );

      case 'PLAN_MAIN':
        return (
          <ContentWrapper title="نقشه اصلی (MainPlan)">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <InputField label="نام فایل نقشه اصلی" value={data.MainPlan?.FileName} onChange={(val) => handleChange(["MainPlan", "FileName"], val)} />
                <InputField label="عنوان نقشه (EstateMap Name)" value={data.MainPlan?.EstateMap?.Name} onChange={(val) => handleChange(["MainPlan", "EstateMap", "Name"], val)} />
              </div>
              {data.MainPlan?.EstateMap?.Features?.[0] && (
                <CoordinateEditor 
                  coordinates={data.MainPlan.EstateMap.Features[0].Geometry.Coordinates}
                  onChange={(newCoords) => handleChange(["MainPlan", "EstateMap", "Features", 0, "Geometry", "Coordinates"], newCoords)}
                />
              )}
            </div>
          </ContentWrapper>
        );

      case 'PLAN_UNIT': {
        const pIdx = activeNode.pIdx;
        const plan = data.UnitPlans?.[pIdx];
        if(!plan) return null;

        // جمع‌آوری تمامی واحدها برای منوی کشویی تخصیص پلان
        const availableUnits = [];
        data.Block.forEach(b => b.Class.forEach(c => c.EstateUnits?.forEach(u => {
            availableUnits.push({
                id: `${b.BlockNo}_${c.ClassNo}_${u.EstateUnitNo}`,
                name: `بلوک ${b.BlockNo} - طبقه ${c.ClassNo} - واحد ${u.EstateUnitNo}`,
            });
        })));

        return (
          <ContentWrapper 
            title={`پلان واحد ${plan.EstateUnitNo} (طبقه ${plan.ClassNo}، بلوک ${plan.BlockNo})`}
            action={<button onClick={() => requestDelete('unitPlan', { idx: pIdx }, `پلان فایل ${plan.FileName || pIdx+1}`)} className="text-red-500 text-sm font-bold bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-all">حذف پلان</button>}
          >
            <div className="bg-cyan-50/30 border border-cyan-100 rounded-xl p-6 shadow-sm max-w-4xl">
              <div className="mb-6 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                 <SelectField 
                    label="تخصیص به واحد موجود" 
                    value={`${plan.BlockNo}_${plan.ClassNo}_${plan.EstateUnitNo}`} 
                    onChange={(val) => {
                        const parts = val.split('_');
                        if(parts.length === 3) {
                            handleChange(["UnitPlans", pIdx, "BlockNo"], Number(parts[0]));
                            handleChange(["UnitPlans", pIdx, "ClassNo"], Number(parts[1]));
                            handleChange(["UnitPlans", pIdx, "EstateUnitNo"], Number(parts[2]));
                        }
                    }} 
                    options={availableUnits}
                    optionIdKey="id"
                    optionNameKey="name"
                 />
                 <p className="text-xs text-slate-400 mt-2 font-bold">با انتخاب واحد از لیست بالا، فیلدهای بلوک، طبقه و واحد به صورت خودکار پر می‌شوند.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                <InputField label="شماره بلوک" value={plan.BlockNo} type="number" onChange={(val) => handleChange(["UnitPlans", pIdx, "BlockNo"], val)} />
                <InputField label="شماره طبقه" value={plan.ClassNo} type="number" onChange={(val) => handleChange(["UnitPlans", pIdx, "ClassNo"], val)} />
                <InputField label="شماره واحد" value={plan.EstateUnitNo} type="number" onChange={(val) => handleChange(["UnitPlans", pIdx, "EstateUnitNo"], val)} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <InputField label="نام فایل" value={plan.FileName} onChange={(val) => handleChange(["UnitPlans", pIdx, "FileName"], val)} />
                <InputField label="عنوان نقشه (Name)" value={plan.UnitMap?.Name} onChange={(val) => handleChange(["UnitPlans", pIdx, "UnitMap", "Name"], val)} />
              </div>

              {plan.UnitMap?.Features?.[0] && (
                <CoordinateEditor 
                  coordinates={plan.UnitMap.Features[0].Geometry.Coordinates}
                  onChange={(newCoords) => handleChange(["UnitPlans", pIdx, "UnitMap", "Features", 0, "Geometry", "Coordinates"], newCoords)}
                />
              )}
            </div>
          </ContentWrapper>
        );
      }

      case 'JSON':
        return (
          <ContentWrapper 
             title="مدیریت اطلاعات (JSON)"
             action={
               <button 
                onClick={() => {
                  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url; link.download = `Estate_${data.requestUniqueId}.json`;
                  link.click(); URL.revokeObjectURL(url);
                }} 
                className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm"
              >
                دانلود JSON
              </button>
             }
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              <div className="flex flex-col h-full">
                <h4 className="font-bold text-slate-700 mb-2 text-sm">وارد کردن (Import)</h4>
                <textarea 
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  className="flex-1 min-h-[300px] bg-slate-50 border border-slate-300 rounded-xl p-4 text-xs font-mono text-slate-800 focus:outline-none focus:border-blue-500 mb-3"
                  placeholder='{"organId": "..."}'
                  dir="ltr"
                />
                <button 
                  onClick={() => {
                    try { 
                      const parsed = JSON.parse(importText);
                      setData(recalculateData(parsed)); 
                      setImportStatus({type: 'success', message: 'با موفقیت وارد شد.'}); 
                      setTimeout(()=>setImportStatus({type:'',message:''}), 3000); 
                    }
                    catch(e){ setImportStatus({type: 'error', message: 'خطا در فرمت JSON'}); }
                  }}
                  className="bg-blue-600 text-white py-2.5 rounded-xl font-bold w-full shadow-sm hover:bg-blue-700 transition-colors"
                >
                  اعمال اطلاعات
                </button>
                {importStatus.message ? <div className={`mt-2 text-xs font-bold p-2 rounded text-center ${importStatus.type==='success'?'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>{importStatus.message}</div> : null}
              </div>
              <div className="flex flex-col h-full overflow-hidden border border-slate-200 rounded-xl bg-slate-900">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700 shrink-0">
                  <span className="text-xs font-bold text-slate-300">خروجی JSON</span>
                  <button 
                    onClick={() => { navigator.clipboard.writeText(JSON.stringify(data, null, 2)); setCopied(true); setTimeout(() => setCopied(false), 2000); }} 
                    className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded transition-colors"
                  >
                    {copied ? 'کپی شد!' : 'کپی متن'}
                  </button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                  <pre className="text-xs text-emerald-400 font-mono text-left whitespace-pre-wrap" dir="ltr">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </ContentWrapper>
        );
      default:
        return null;
    }
  };

  const summaryData = getSummary();
  return (
    <div className="h-screen flex flex-col bg-slate-200 text-slate-800 overflow-hidden font-[Tahoma,Arial,sans-serif]" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0 z-20 shadow-sm">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600"><path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
            پنجره واحد مدیریت زمین
          </h1>
          <p className="text-xs text-slate-500 mt-1 mr-8">مدیریت اطلاعات ماده ۱۴</p>
        </div>
        <div className="flex gap-4 text-xs font-bold text-slate-500">
           <span>کد درخواست: <span className="text-slate-800">{data.requestUniqueId}</span></span>
        </div>
      </header>

      {/* Summary Dashboard Bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-2 flex items-center gap-3 text-xs overflow-x-auto whitespace-nowrap shadow-sm z-10 shrink-0" style={{ scrollbarWidth: 'none' }}>
         <span className="font-extrabold text-slate-700 flex items-center gap-1"><MapIcon className="w-4 h-4 text-slate-400"/> خلاصه وضعیت:</span>
         <span className="bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md font-bold shadow-sm">مجموع بلوک‌ها: {summaryData.totalBlocks}</span>
         <span className="bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md font-bold shadow-sm">مجموع طبقات: {summaryData.totalClasses}</span>
         <span className="bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md font-bold shadow-sm">کل واحدها: {summaryData.totalUnits}</span>
         <span className="bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md font-bold shadow-sm">کل قطعات مشاع/منضم: {summaryData.totalJoints}</span>
         
         <div className="w-px h-4 bg-slate-300 mx-1"></div>
         <span className="text-slate-500 font-bold">انواع مشاعات:</span>
         {Object.entries(summaryData.jointTypesCount).length === 0 ? <span className="text-slate-400 italic">ندارد</span> : null}
         {Object.entries(summaryData.jointTypesCount).map(([type, count]) => (
              <span key={type} className="bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-md font-bold shadow-sm">
                {type}: {count}
              </span>
         ))}
      </div>

      {/* Main Layout (Sidebar + Content) */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 p-2 md:p-4 gap-4">
        {/* Sidebar */}
        {renderSidebar()}
        
        {/* Main Content Area */}
        <div className="flex-1 min-w-0 h-full overflow-hidden relative">
          {renderContent()}
        </div>
      </div>

      <ConfirmModal 
        isOpen={deleteModal.isOpen} 
        title={deleteModal.title} 
        onConfirm={executeDelete} 
        onCancel={() => setDeleteModal({ isOpen: false, type: null, pathParams: null, title: '' })} 
      />
    </div>
  );
}
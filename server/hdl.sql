#功能:vue_server_00 海底捞服务器端
#创建数据库haidilao
#SET NAMES UTF8;
#DROP DATABASE IF EXISTS haidilao;
#CREATE DATABASE haidilao CHARSET=UTF8;

#程序
#1:进入指定库 haidilao
USE haidilao;

#功能一:查询菜品类别列表
DROP TABLE IF EXISTS hdl_ptype;
#2:创建表 hdl_ptype
CREATE TABLE hdl_ptype(
  tid INT PRIMARY KEY AUTO_INCREMENT,
  tname VARCHAR(50)
);
#3:添加类别
INSERT INTO hdl_ptype VALUES(null,'锅底');
INSERT INTO hdl_ptype VALUES(null,'捞派特色');
INSERT INTO hdl_ptype VALUES(null,'肉类');
INSERT INTO hdl_ptype VALUES(null,'海鲜');
INSERT INTO hdl_ptype VALUES(null,'丸滑');
INSERT INTO hdl_ptype VALUES(null,'蔬菜');
INSERT INTO hdl_ptype VALUES(null,'菌菇豆制');
INSERT INTO hdl_ptype VALUES(null,'小吃甜品');
INSERT INTO hdl_ptype VALUES(null,'特色饮品');

#功能二：菜品列表
DROP TABLE IF EXISTS hdl_cai;
#2:创建表 hdl_cai
CREATE TABLE hdl_cai(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  ctitle VARCHAR(50),
  cpic VARCHAR(50),
  soutitle VARCHAR(50),
  price INT,
  details VARCHAR(200),
  tno INT
);
#3:添加菜品
 #锅底
INSERT INTO hdl_cai VALUES(null,'番茄火锅','guodi/fanqie.jpg','一定要喝汤的番茄锅',72,'精选日照充裕的阳光番茄，制酱炒制而成的番茄底料；推荐搭配河鲜类食材。',1);
INSERT INTO hdl_cai VALUES(null,'三鲜火锅','guodi/sanxian.jpg','口感鲜香浓郁',72,'选用现代工艺萃取的结合肉类浓缩骨汤为汤底；可根据喜好搭配不同的特色味碟均可，配合芝麻酱更佳；推荐搭配涮食海鲜类及素食类食材。',1);
INSERT INTO hdl_cai VALUES(null,'菌汤火锅','guodi/juntang.jpg','菌菇慢火熬煮2小时',79,'锅底汤色黄褐，清澈；菌香浓郁、爽口；推荐搭配涮食菌菇类食材。',1);
INSERT INTO hdl_cai VALUES(null,'清油麻辣火锅','guodi/mala.jpg','香辣浓郁不油腻',82,'严选花椒、辣椒、香辛料原料，地道川味火锅；传统工艺发酵豆瓣；汤底色泽鲜红，口感香辣浓郁；推荐搭配涮食脆弹类动物食材。',1);
INSERT INTO hdl_cai VALUES(null,'牛油麻辣火锅','guodi/niuyou.jpg','慢火熬煮4小时',112,'选用牛油与茂汶等原产花椒，越煮越香，不变味，搭配蒜泥香油味碟，这样吃才地道。',1);

 #捞派特色
INSERT INTO hdl_cai VALUES(null,'捞派捞面','tese/laomian.jpg','现场为你舞面',12,'海底捞明星产品，使用国内优质的小麦高筋面粉，坚持传统酵母发酵工艺。捞面师现场为你舞面，现做现吃，是海底捞自创的体验',2);
INSERT INTO hdl_cai VALUES(null,'捞派黄喉','tese/huanghou.jpg','口感脆嫩弹牙',28,'精选猪黄喉，通过去筋膜、清水浸泡15小时以上，自然去除黄喉的血水和腥味。口感脆嫩弹牙。',2);
INSERT INTO hdl_cai VALUES(null,'捞派鸭肠','tese/yachang.jpg','自然脆爽有嚼劲',21,'选用资质和证件齐全的屠宰场鸭肠，确保每根鸭肠无杂物，口感自然脆爽有嚼劲',2);
INSERT INTO hdl_cai VALUES(null,'捞派脆脆毛肚','tese/maodu.jpg','“七上八下”',32,'选自牛的草肚，采用流水清洗、撕片等工艺，加入木瓜蛋白酶精工而成。口感脆嫩，锅开后再采用“七上八下”的方法涮15秒即可食用。',2);

#肉类
INSERT INTO hdl_cai VALUES(null,'草原羊羔肉','rou/yang.jpg','鲜嫩多汁无膻味',26,'选自内蒙古锡林郭勒、呼伦贝尔等大草原12月龄以下羔羊，经过排酸、精选分切、冷冻而成。无膻味、鲜嫩多汁，锅开后涮30秒左右即可食用。',3);
INSERT INTO hdl_cai VALUES(null,'捞派肥牛','rou/niu.jpg','口感细腻,肉味十足',35,'肥牛是精选谷饲100天以上的牛经过一定的温度、湿度、风速的环境下使牛的肌肉纤维发生变化排酸处理后，自然块分割，刨成薄片的牛肉，其口感细腻、化渣，肉味十足。',3);

#海鲜
INSERT INTO hdl_cai VALUES(null,'泰国黑虎虾','haixian/xia.jpg','鲜美活虾蒸煮',18,'优选泰国纯海水养殖的黑虎虾，挑拣其品质大规格符合海底捞统一标准的黑虎活虾，其品种黑虎虾的虾青素含量较普通虾高出很多。而活虾直接蒸煮的工艺可最大程度保留虾的鲜嫩，使上桌时还可尝到黑虎虾刚捕捞时的鲜美滋味',4);
INSERT INTO hdl_cai VALUES(null,'巴沙鱼片','haixian/yu.jpg','无刺无腥味',27,'精选越南湄公河流域养殖的巴沙鱼。经工厂低温车间宰杀、快速去皮等工艺加工成鱼柳，再通过海底捞中央厨房秘制调理而成。口味鲜嫩，且无刺无腥味，特别适合老人、小孩食用。',4);

#丸滑
INSERT INTO hdl_cai VALUES(null,'招牌虾滑','wanhua/xia.jpg','入口爽滑鲜甜',29,'精选南美品种白虾虾仁，通过海底捞独有的虾滑生产工艺，虾肉含量高达93%，上桌前至少手工摔打10次，Q弹十足，入口爽滑鲜甜招牌虾滑是海底捞的经典食材之一。建议涮锅3分钟味道最佳。',5);

#蔬菜
INSERT INTO hdl_cai VALUES(null,'娃娃菜','cai/wawa.jpg','口感脆嫩',11,'火锅常备菜。来自山东、云南、河北等地的精选新鲜娃娃菜，经挑选、清洗、切配而成，口感脆嫩，涮煮2分钟左右',6);

#菌菇豆制
INSERT INTO hdl_cai VALUES(null,'香菇','jungudouzhi/xianggu.jpg','香嫩爽滑',15,'来自河北、东北等地的新鲜香菇，工厂化种植，保证产品质量安全，经过挑选、清洗、切配、装盘而成。香嫩爽滑，锅开后再煮4分钟左右即可食用。',7);

#小吃甜品
INSERT INTO hdl_cai VALUES(null,'现炸酥肉','xiaochi/surou.jpg','色泽金黄、肥而不腻',20,'选用上等五花肉切条，蛋液、红薯粉上浆，色泽金黄、肥而不腻、配上干辣椒碟或者番茄酱食用，口感香脆，风味独特，直接涮火锅食用也超赞哦。',8);

#特色饮品
INSERT INTO hdl_cai VALUES(null,'德式小麦啤酒','yinpin/jiu.jpg','泡沫绵密细腻',12,'海底捞邀请台湾金色三麦研发和监制，由德国优布劳公司在中国的工厂酿造。该啤酒采用德国南部巴伐利亚地区传统小麦啤酿造工艺，泡沫绵密细腻，拥有水果、麦芽、酒花的香气相融的复合香气，口感更加温和细腻顺滑。适合口味清淡的人和女士饮用。',9);

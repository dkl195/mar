# Requirements Document

## Introduction

AI Fashion Commerce Platform là một nền tảng thương mại điện tử thời trang tích hợp trí tuệ nhân tạo toàn diện, hỗ trợ bán hàng đa kênh (website, mạng xã hội, sàn thương mại điện tử), quản lý kho hàng thông minh, phân tích kinh doanh nâng cao và trải nghiệm mua sắm cá nhân hóa. Hệ thống được thiết kế theo kiến trúc microservices, có khả năng mở rộng và tích hợp API với các dịch vụ bên ngoài.

---

## Glossary

- **Platform**: Toàn bộ hệ thống AI Fashion Commerce Platform
- **Stylist_AI**: Module AI tư vấn phong cách và gợi ý trang phục
- **TryOn_Engine**: Module xử lý thử đồ ảo bằng AI
- **Vision_AI**: Module nhận diện và xử lý ảnh sản phẩm
- **Search_AI**: Module tìm kiếm bằng ngôn ngữ tự nhiên và hình ảnh
- **Recommendation_Engine**: Module gợi ý sản phẩm cá nhân hóa
- **Inventory_System**: Module quản lý kho hàng thông minh
- **Analytics_AI**: Module phân tích kinh doanh và dự báo
- **Marketing_AI**: Module tự động hóa nội dung marketing
- **CRM_System**: Module quản lý quan hệ khách hàng
- **Chatbot**: Module chatbot bán hàng tự động 24/7
- **Admin_Portal**: Giao diện quản trị hệ thống
- **Channel_Manager**: Module quản lý đa kênh bán hàng
- **Security_Center**: Module bảo mật và phân quyền
- **Report_Engine**: Module tạo báo cáo tự động
- **User**: Khách hàng cuối sử dụng nền tảng
- **Merchant**: Chủ cửa hàng / quản trị viên kinh doanh
- **Staff**: Nhân viên được phân quyền truy cập hệ thống
- **SKU**: Mã định danh đơn vị sản phẩm (Stock Keeping Unit)
- **CLV**: Giá trị vòng đời khách hàng (Customer Lifetime Value)

---

## Requirements

### Requirement 1: AI Virtual Stylist — Tư Vấn Phong Cách Cá Nhân

**User Story:** Là một khách hàng, tôi muốn nhập thông tin cơ thể và sở thích cá nhân để nhận gợi ý trang phục phù hợp từ AI, giúp tôi mua sắm nhanh hơn và tự tin hơn.

#### Acceptance Criteria

1. WHEN khách hàng nhập thông tin cá nhân (chiều cao, cân nặng, số đo vòng ngực, vòng bụng, vai, tuổi, giới tính, màu da, vóc dáng, sở thích, dịp sử dụng), THE Stylist_AI SHALL trả về gợi ý size trang phục phù hợp trong vòng 3 giây.
2. WHEN Stylist_AI tạo gợi ý phối đồ, THE Stylist_AI SHALL đề xuất ít nhất 3 bộ trang phục hoàn chỉnh bao gồm áo, quần/váy và phụ kiện phù hợp với dịp sử dụng đã nhập.
3. WHEN khách hàng thay đổi một trường thông tin đã nhập, THE Stylist_AI SHALL cập nhật lại toàn bộ gợi ý trong vòng 3 giây mà không yêu cầu nhập lại thông tin còn lại.
4. IF khách hàng không cung cấp đủ thông tin bắt buộc (chiều cao, cân nặng, giới tính), THEN THE Stylist_AI SHALL hiển thị thông báo yêu cầu bổ sung trường còn thiếu và không tiến hành tạo gợi ý.
5. THE Stylist_AI SHALL ánh xạ số đo cơ thể sang bảng size chuẩn (S/M/L/XL/XXL và size số) với độ chính xác được xác minh so với bảng quy đổi size chuẩn của từng thương hiệu.
6. WHEN Stylist_AI đề xuất bộ sưu tập, THE Stylist_AI SHALL chỉ gợi ý các sản phẩm đang có trong kho với số lượng tồn kho lớn hơn 0.
7. WHERE tính năng gợi ý màu sắc theo màu da được kích hoạt, THE Stylist_AI SHALL đề xuất ít nhất 5 màu sắc trang phục phù hợp với tông màu da của khách hàng.

---

### Yêu Cầu 2: AI Virtual Try-On — Thử Đồ Ảo

**User Story:** Là một khách hàng, tôi muốn thử trang phục ảo trên ảnh của mình để trực quan hóa ngoại hình trước khi quyết định mua, giảm tỷ lệ hoàn trả hàng.

#### Acceptance Criteria

1. WHEN khách hàng tải lên ảnh cá nhân (định dạng JPG, PNG, WEBP, kích thước tối thiểu 300x300px), THE TryOn_Engine SHALL ghép ảo sản phẩm lên ảnh người dùng và trả về ảnh kết quả trong vòng 10 giây.
2. WHEN TryOn_Engine xử lý ảnh thử đồ, THE TryOn_Engine SHALL giữ nguyên tỷ lệ cơ thể và độ sáng môi trường của ảnh gốc trong ảnh kết quả.
3. WHEN khách hàng yêu cầu thay màu sắc sản phẩm trong ảnh thử đồ, THE TryOn_Engine SHALL áp dụng màu mới và hiển thị ảnh cập nhật trong vòng 3 giây mà không yêu cầu tải lại ảnh gốc.
4. WHEN khách hàng yêu cầu xem sản phẩm từ góc nhìn khác (trước, sau, bên cạnh), THE TryOn_Engine SHALL tạo ảnh từ góc nhìn tương ứng dựa trên mô hình 3D của sản phẩm trong vòng 5 giây.
5. IF ảnh tải lên không phát hiện được khuôn mặt hoặc cơ thể người, THEN THE TryOn_Engine SHALL từ chối xử lý và trả về thông báo lỗi mô tả rõ lý do trong vòng 2 giây.
6. THE TryOn_Engine SHALL tạo ảnh 3D preview của sản phẩm từ ít nhất 4 góc nhìn khác nhau cho mỗi sản phẩm trong catalog.
7. WHEN khách hàng lưu ảnh thử đồ, THE TryOn_Engine SHALL lưu ảnh vào Cloud Storage và tạo liên kết chia sẻ trong vòng 2 giây.

---

### Yêu Cầu 3: Nhận Diện Khuôn Mặt và Gợi Ý Phong Cách

**User Story:** Là một khách hàng, tôi muốn hệ thống phân tích hình dạng khuôn mặt của tôi để gợi ý kiểu tóc và phong cách thời trang phù hợp nhất với ngoại hình của mình.

#### Acceptance Criteria

1. WHEN khách hàng tải lên ảnh chân dung (tỷ lệ khuôn mặt chiếm tối thiểu 30% khung hình), THE Vision_AI SHALL phân tích hình dạng khuôn mặt và phân loại vào một trong 7 nhóm chuẩn (oval, tròn, vuông, trái tim, kim cương, chữ nhật, tam giác) trong vòng 3 giây.
2. WHEN Vision_AI xác định hình dạng khuôn mặt, THE Stylist_AI SHALL gợi ý ít nhất 5 kiểu tóc phù hợp và ít nhất 3 kiểu cổ áo phù hợp với hình dạng khuôn mặt đó.
3. WHEN Vision_AI phân tích khuôn mặt, THE Stylist_AI SHALL gợi ý phong cách thời trang (casual, formal, streetwear, elegant, v.v.) phù hợp với hình dạng khuôn mặt trong kết quả trả về.
4. IF Vision_AI không phát hiện khuôn mặt rõ ràng trong ảnh (độ tin cậy nhận diện dưới 80%), THEN THE Vision_AI SHALL thông báo cho khách hàng và yêu cầu tải lên ảnh khác có khuôn mặt rõ hơn.
5. THE Platform SHALL xử lý dữ liệu khuôn mặt phù hợp với quy định bảo vệ dữ liệu cá nhân, không lưu trữ ảnh khuôn mặt sau khi phân tích xong mà không có sự đồng ý rõ ràng của khách hàng.

---

### Yêu Cầu 4: AI Natural Language Search — Tìm Kiếm Ngôn Ngữ Tự Nhiên

**User Story:** Là một khách hàng, tôi muốn tìm kiếm sản phẩm bằng câu nói tự nhiên thay vì phải dùng bộ lọc thủ công, để tìm được đúng sản phẩm mình cần nhanh hơn.

#### Acceptance Criteria

1. WHEN khách hàng nhập truy vấn tìm kiếm bằng ngôn ngữ tự nhiên (ví dụ: "Áo sơ mi trắng đi làm dưới 500 nghìn"), THE Search_AI SHALL phân tích truy vấn và trả về danh sách sản phẩm phù hợp trong vòng 2 giây.
2. WHEN Search_AI xử lý truy vấn, THE Search_AI SHALL trích xuất các thuộc tính (loại sản phẩm, màu sắc, dịp sử dụng, khoảng giá, size) từ câu tìm kiếm và áp dụng chúng làm bộ lọc.
3. WHEN khách hàng tìm kiếm bằng ảnh tải lên, THE Search_AI SHALL nhận diện sản phẩm trong ảnh và trả về danh sách sản phẩm tương tự trong catalog trong vòng 3 giây.
4. THE Search_AI SHALL hỗ trợ tìm kiếm bằng tiếng Việt và tiếng Anh, bao gồm cả các từ viết tắt phổ biến và tiếng lóng thời trang.
5. IF truy vấn tìm kiếm không trả về kết quả chính xác, THE Search_AI SHALL gợi ý tối đa 5 từ khóa liên quan để khách hàng thử lại.
6. WHEN Search_AI trả về kết quả, THE Search_AI SHALL sắp xếp sản phẩm theo độ phù hợp giảm dần và hiển thị điểm phù hợp cho mỗi kết quả trong giao diện quản trị.

---

### Yêu Cầu 5: Recommendation Engine — Gợi Ý Sản Phẩm Cá Nhân Hóa

**User Story:** Là một khách hàng, tôi muốn nhận gợi ý sản phẩm phù hợp với sở thích và lịch sử mua sắm của mình, để khám phá được nhiều sản phẩm ưa thích hơn mà không cần tìm kiếm thủ công.

#### Acceptance Criteria

1. WHEN khách hàng đăng nhập và truy cập trang chủ, THE Recommendation_Engine SHALL hiển thị tối thiểu 12 sản phẩm được cá nhân hóa dựa trên lịch sử mua hàng và lịch sử xem trong vòng 2 giây.
2. WHILE khách hàng đang xem trang chi tiết sản phẩm, THE Recommendation_Engine SHALL hiển thị tối thiểu 6 sản phẩm "thường được mua cùng" và 6 sản phẩm "tương tự".
3. WHEN Recommendation_Engine cập nhật mô hình gợi ý, THE Recommendation_Engine SHALL học từ dữ liệu hành vi (lượt xem, lượt thêm giỏ hàng, lượt mua, đánh giá) với chu kỳ cập nhật tối đa 24 giờ.
4. THE Recommendation_Engine SHALL không gợi ý sản phẩm đã hết hàng (tồn kho bằng 0) hoặc đã bị ẩn bởi Merchant.
5. WHERE tính năng gợi ý theo xu hướng được bật, THE Recommendation_Engine SHALL kết hợp xu hướng mua hàng chung của toàn hệ thống với sở thích cá nhân của khách hàng trong tỷ lệ cấu hình được bởi Merchant.
6. WHEN khách hàng mới chưa có lịch sử, THE Recommendation_Engine SHALL gợi ý sản phẩm dựa trên xu hướng bán chạy nhất trong 7 ngày gần nhất.

---

### Yêu Cầu 6: AI Vision Center — Xử Lý và Quản Lý Ảnh Sản Phẩm

**User Story:** Là một Merchant, tôi muốn hệ thống tự động xử lý ảnh sản phẩm (xóa nền, chuẩn hóa, tạo nhiều góc nhìn) và gợi ý mô tả SEO, để tiết kiệm thời gian đăng sản phẩm và tối ưu hiệu quả bán hàng.

#### Acceptance Criteria

1. WHEN Merchant tải lên ảnh sản phẩm, THE Vision_AI SHALL tự động xóa nền và chuẩn hóa kích thước về 800x800px trong vòng 5 giây mà không làm mất chi tiết sản phẩm.
2. WHEN Vision_AI xử lý ảnh sản phẩm, THE Vision_AI SHALL đánh giá chất lượng ảnh theo thang điểm 1–100 và từ chối ảnh có điểm dưới 50 kèm thông báo lý do cụ thể.
3. WHEN Vision_AI nhận ảnh sản phẩm hợp lệ, THE Vision_AI SHALL tự động tăng chất lượng (sharpness, contrast, brightness) và tạo tối thiểu 4 góc nhìn khác nhau trong vòng 30 giây.
4. WHEN Merchant yêu cầu nhận diện sản phẩm từ ảnh, THE Vision_AI SHALL phân loại sản phẩm (loại, màu sắc, chất liệu, phong cách) với độ tin cậy hiển thị cho từng nhãn phân loại.
5. WHEN Vision_AI phân tích sản phẩm hoàn tất, THE Vision_AI SHALL tạo tự động ít nhất 3 phương án mô tả sản phẩm và 10 từ khóa SEO gợi ý để Merchant chọn lựa.
6. THE Vision_AI SHALL phát hiện và từ chối ảnh có nội dung vi phạm chính sách (ảnh không phù hợp, logo cạnh tranh) trước khi lưu vào hệ thống.
7. WHEN Vision_AI sinh nhiều góc nhìn từ một ảnh gốc, THE Vision_AI SHALL duy trì tính nhất quán về màu sắc và chi tiết sản phẩm giữa các góc nhìn.

---

### Yêu Cầu 7: Quản Lý Kho Thông Minh

**User Story:** Là một Merchant, tôi muốn quản lý nhập xuất kho một cách thông minh với hỗ trợ dự báo từ AI, để luôn có đủ hàng bán mà không tồn kho quá nhiều.

#### Acceptance Criteria

1. THE Inventory_System SHALL theo dõi số lượng tồn kho theo từng SKU (sản phẩm, size, màu sắc) theo thời gian thực và cập nhật ngay khi có giao dịch mua bán hoặc nhập hàng.
2. WHEN Merchant tạo phiếu nhập kho, THE Inventory_System SHALL cập nhật số lượng tồn kho và ghi nhận lịch sử nhập hàng trong vòng 1 giây.
3. WHEN tồn kho của một SKU xuống dưới ngưỡng cảnh báo (cấu hình được bởi Merchant), THE Inventory_System SHALL gửi thông báo tự động cho Merchant qua email và giao diện Admin_Portal.
4. WHEN Analytics_AI phân tích dữ liệu bán hàng, THE Analytics_AI SHALL dự báo nhu cầu nhập hàng cho từng SKU dựa trên xu hướng bán hàng 30 ngày gần nhất và tạo đề xuất nhập hàng tự động mỗi ngày.
5. THE Analytics_AI SHALL xác định sản phẩm tồn kho lâu (không bán được trong 60 ngày) và hiển thị danh sách trong Dashboard với đề xuất giải pháp (giảm giá, khuyến mãi).
6. WHEN Merchant thực hiện điều chuyển hàng giữa các cửa hàng, THE Inventory_System SHALL ghi nhận giao dịch điều chuyển và cập nhật tồn kho tại cả hai cửa hàng trong vòng 2 giây.
7. THE Inventory_System SHALL hỗ trợ xuất báo cáo tồn kho theo định dạng Excel với đầy đủ thông tin SKU, số lượng, giá trị tồn kho tại mọi thời điểm yêu cầu.

---

### Yêu Cầu 8: Dashboard Thông Minh và Báo Cáo Tự Động

**User Story:** Là một Merchant, tôi muốn xem dashboard tổng quan kinh doanh theo thời gian thực và xuất báo cáo tự động theo nhiều định dạng, để theo dõi hiệu quả kinh doanh và đưa ra quyết định kịp thời.

#### Acceptance Criteria

1. WHEN Merchant truy cập Dashboard, THE Admin_Portal SHALL hiển thị các chỉ số kinh doanh cốt lõi (doanh thu, lợi nhuận, số đơn hàng, tỷ lệ chuyển đổi, hàng tồn kho) được cập nhật trong vòng 5 giây sau giao dịch gần nhất.
2. THE Admin_Portal SHALL hiển thị biểu đồ xu hướng theo thời gian cho tất cả chỉ số cốt lõi với các khoảng thời gian có thể chọn: ngày, tuần, tháng, quý, năm.
3. WHEN Merchant yêu cầu xuất báo cáo, THE Report_Engine SHALL tạo báo cáo theo định dạng Word, Excel hoặc PDF trong vòng 30 giây với đầy đủ dữ liệu theo khoảng thời gian đã chọn.
4. THE Report_Engine SHALL hỗ trợ lập lịch báo cáo tự động (ngày, tuần, tháng, quý, năm) và gửi file báo cáo đến địa chỉ email được cấu hình vào thời điểm đã đặt.
5. THE Admin_Portal SHALL hiển thị top 10 sản phẩm bán chạy nhất theo doanh số và doanh thu, có thể lọc theo khoảng thời gian và danh mục sản phẩm.
6. THE Admin_Portal SHALL hiển thị phân tích size và màu sắc bán chạy theo dạng biểu đồ heat map để Merchant dễ dàng xác định xu hướng.
7. WHEN Merchant xem báo cáo khách hàng, THE Admin_Portal SHALL hiển thị tỷ lệ khách hàng quay lại, giá trị trung bình mỗi đơn hàng và phân khúc khách hàng theo CLV.

---

### Yêu Cầu 9: AI Business Advisor — Cố Vấn Kinh Doanh AI

**User Story:** Là một Merchant, tôi muốn nhận phân tích tự động từ AI về nguyên nhân biến động kinh doanh và chiến lược đề xuất, để tối ưu hóa hoạt động kinh doanh mà không cần thuê chuyên gia phân tích.

#### Acceptance Criteria

1. WHEN doanh thu giảm hơn 20% so với kỳ trước, THE Analytics_AI SHALL tự động phân tích nguyên nhân và gửi báo cáo phân tích trong vòng 1 giờ cho Merchant.
2. WHEN Analytics_AI phân tích dữ liệu kinh doanh hàng ngày, THE Analytics_AI SHALL tạo ít nhất 3 đề xuất hành động cụ thể (nhập hàng, điều chỉnh giá, chạy khuyến mãi) có thể thực thi ngay.
3. THE Analytics_AI SHALL dự báo doanh thu cho 7 ngày, 30 ngày và 90 ngày tiếp theo dựa trên dữ liệu lịch sử, xu hướng mùa vụ và các đơn hàng đã xác nhận, với khoảng tin cậy hiển thị rõ ràng.
4. WHEN Merchant đặt câu hỏi bằng ngôn ngữ tự nhiên (ví dụ: "Vì sao doanh thu tuần này giảm?"), THE Analytics_AI SHALL phân tích dữ liệu và trả lời bằng ngôn ngữ tự nhiên kèm bằng chứng số liệu trong vòng 5 giây.
5. THE Analytics_AI SHALL xác định khách hàng có nguy cơ rời bỏ (không mua trong 90 ngày sau khi đã mua ít nhất 2 lần) và hiển thị danh sách cập nhật hàng ngày trong Dashboard.
6. THE Analytics_AI SHALL phân tích hiệu quả từng chương trình khuyến mãi (tỷ lệ sử dụng, doanh thu tăng thêm, lợi nhuận ròng) và so sánh với chi phí khuyến mãi.

---

### Yêu Cầu 10: AI Marketing — Tự Động Hóa Nội Dung Marketing

**User Story:** Là một Merchant, tôi muốn AI tự động tạo nội dung marketing cho nhiều kênh khác nhau, để giảm thời gian sáng tạo nội dung và duy trì hiện diện thương hiệu đồng nhất.

#### Acceptance Criteria

1. WHEN Merchant yêu cầu tạo nội dung marketing cho sản phẩm, THE Marketing_AI SHALL tạo ít nhất 3 phương án nội dung phù hợp định dạng của từng kênh (Facebook, TikTok, Shopee, Zalo, Email) trong vòng 10 giây.
2. WHEN Marketing_AI tạo nội dung, THE Marketing_AI SHALL tùy chỉnh ngôn ngữ và phong cách theo từng kênh (ví dụ: ngắn gọn cho TikTok, chi tiết cho Email) và theo giọng văn thương hiệu được cấu hình bởi Merchant.
3. THE Marketing_AI SHALL tạo banner quảng cáo với kích thước chuẩn cho từng kênh dựa trên ảnh sản phẩm và thông tin khuyến mãi được cung cấp trong vòng 15 giây.
4. WHEN Merchant tạo chương trình khuyến mãi, THE Marketing_AI SHALL tự động tạo nội dung công bố khuyến mãi trên tất cả kênh được cấu hình và lên lịch đăng theo thời gian Merchant chỉ định.
5. THE Marketing_AI SHALL đề xuất thời điểm đăng bài tối ưu cho từng kênh dựa trên dữ liệu tương tác lịch sử của tài khoản.
6. WHEN nội dung marketing được đăng, THE Marketing_AI SHALL theo dõi chỉ số tương tác (lượt xem, click, chuyển đổi) và tạo báo cáo hiệu quả sau 24 giờ.

---

### Yêu Cầu 11: Chatbot Bán Hàng Tự Động 24/7

**User Story:** Là một khách hàng, tôi muốn được tư vấn và hỗ trợ mua sắm mọi lúc kể cả ngoài giờ làm việc, để không bị chậm trễ trong quá trình mua hàng.

#### Acceptance Criteria

1. THE Chatbot SHALL phản hồi mọi tin nhắn từ khách hàng trong vòng 2 giây vào mọi thời điểm trong ngày.
2. WHEN khách hàng hỏi về sản phẩm, THE Chatbot SHALL tra cứu thông tin sản phẩm trong catalog và trả lời bao gồm giá, tình trạng tồn kho và link sản phẩm.
3. WHEN khách hàng hỏi về tình trạng đơn hàng, THE Chatbot SHALL tra cứu hệ thống và trả về thông tin trạng thái đơn hàng mới nhất kèm thông tin vận chuyển nếu có.
4. WHEN khách hàng yêu cầu so sánh sản phẩm, THE Chatbot SHALL tạo bảng so sánh tối đa 3 sản phẩm theo các thuộc tính chính (giá, size, chất liệu, đánh giá).
5. IF Chatbot không thể giải quyết yêu cầu của khách hàng sau 3 lượt hỏi-đáp, THE Chatbot SHALL tự động chuyển cuộc hội thoại cho Staff và thông báo cho khách hàng về thời gian phản hồi dự kiến.
6. THE Chatbot SHALL hỗ trợ tiếng Việt và tiếng Anh, nhận diện ngôn ngữ tự động từ tin nhắn đầu tiên của khách hàng.
7. WHEN Chatbot xử lý yêu cầu đặt hàng, THE Chatbot SHALL thu thập đầy đủ thông tin (sản phẩm, size, màu, địa chỉ giao hàng) và tạo đơn hàng trong hệ thống với xác nhận gửi về cho khách.

---

### Yêu Cầu 12: Loyalty Program — Chương Trình Khách Hàng Thân Thiết

**User Story:** Là một khách hàng, tôi muốn được tích lũy điểm thưởng và nâng cấp hạng thành viên khi mua sắm, để cảm thấy được trân trọng và có động lực quay lại mua hàng nhiều hơn.

#### Acceptance Criteria

1. WHEN khách hàng hoàn tất đơn hàng được xác nhận giao thành công, THE CRM_System SHALL cộng điểm thưởng vào tài khoản khách hàng trong vòng 1 giờ theo công thức điểm được Merchant cấu hình.
2. THE CRM_System SHALL phân loại khách hàng thành ít nhất 3 hạng thành viên (ví dụ: Đồng, Bạc, Vàng) dựa trên tổng chi tiêu trong 12 tháng gần nhất và cập nhật hạng tự động mỗi ngày.
3. WHEN khách hàng sử dụng điểm thưởng để thanh toán, THE CRM_System SHALL khấu trừ điểm và áp dụng giảm giá tương ứng ngay tại bước thanh toán trước khi xác nhận đơn.
4. WHEN khách hàng đạt ngưỡng thăng hạng, THE CRM_System SHALL gửi thông báo chúc mừng qua email và hiển thị quyền lợi mới trong ứng dụng trong vòng 5 phút.
5. THE CRM_System SHALL tạo và phân phối voucher cá nhân hóa dựa trên hành vi mua sắm và hạng thành viên của từng khách hàng.
6. IF khách hàng không phát sinh giao dịch trong 180 ngày, THEN THE CRM_System SHALL gửi thông báo nhắc nhở và tặng voucher kích hoạt lại tài khoản tự động.

---

### Yêu Cầu 13: Customer 360 — Hồ Sơ Khách Hàng Toàn Diện

**User Story:** Là một Merchant hoặc Staff, tôi muốn xem toàn bộ thông tin và lịch sử tương tác của từng khách hàng trong một giao diện duy nhất, để cá nhân hóa dịch vụ và tối ưu chiến lược giữ chân khách hàng.

#### Acceptance Criteria

1. THE CRM_System SHALL duy trì hồ sơ thống nhất cho mỗi khách hàng bao gồm thông tin cá nhân, lịch sử mua hàng trên tất cả kênh, sở thích, điểm thưởng, hạng thành viên và CLV.
2. WHEN Staff truy cập hồ sơ khách hàng, THE CRM_System SHALL hiển thị đầy đủ thông tin Customer 360 trong vòng 2 giây.
3. THE Analytics_AI SHALL tính toán CLV của từng khách hàng dựa trên lịch sử mua hàng, tần suất mua và giá trị trung bình đơn hàng, cập nhật hàng ngày.
4. THE CRM_System SHALL phân khúc khách hàng tự động theo hành vi mua hàng (ví dụ: khách mua theo mùa, khách mua hàng cao cấp, khách săn giảm giá) và cập nhật phân khúc hàng tuần.
5. WHEN Analytics_AI dự báo khách hàng có khả năng rời bỏ, THE CRM_System SHALL gắn cờ cảnh báo trên hồ sơ khách hàng và đề xuất hành động giữ chân phù hợp.
6. THE CRM_System SHALL tổng hợp tất cả tương tác của khách hàng (chat, đơn hàng, khiếu nại, đánh giá) từ mọi kênh vào timeline thống nhất theo thứ tự thời gian.

---

### Yêu Cầu 14: Workflow Automation — Tự Động Hóa Quy Trình

**User Story:** Là một Merchant, tôi muốn tự động hóa các tác vụ lặp lại (xác nhận đơn, gửi thông báo, cập nhật trạng thái) để giảm tải cho nhân viên và đảm bảo khách hàng luôn được cập nhật kịp thời.

#### Acceptance Criteria

1. WHEN đơn hàng được tạo thành công, THE Platform SHALL tự động gửi email xác nhận đơn hàng đến khách hàng trong vòng 1 phút, bao gồm mã đơn hàng, danh sách sản phẩm và thông tin thanh toán.
2. WHEN trạng thái đơn hàng thay đổi (xác nhận, đóng gói, vận chuyển, giao thành công), THE Platform SHALL tự động gửi thông báo cập nhật qua kênh được khách hàng ưu tiên (email, SMS, Zalo) trong vòng 5 phút.
3. WHEN đơn hàng chưa được thanh toán sau 24 giờ, THE Platform SHALL tự động gửi nhắc nhở thanh toán đến khách hàng và lặp lại sau 48 giờ nếu vẫn chưa thanh toán.
4. WHEN khách hàng nhận hàng được 3 ngày (trạng thái giao thành công), THE Platform SHALL tự động gửi yêu cầu đánh giá sản phẩm kèm link đánh giá trực tiếp.
5. THE Platform SHALL cho phép Merchant tạo workflow tự động tùy chỉnh (trigger + hành động) thông qua giao diện kéo thả trong Admin_Portal mà không cần lập trình.
6. WHEN workflow tự động thất bại (gửi email lỗi, API timeout), THE Platform SHALL ghi log lỗi và thử lại tối đa 3 lần với khoảng cách 5 phút giữa các lần thử.

---

### Yêu Cầu 15: Channel Manager — Quản Lý Đa Kênh Bán Hàng

**User Story:** Là một Merchant, tôi muốn quản lý sản phẩm, đơn hàng và tồn kho đồng bộ trên tất cả kênh bán hàng từ một giao diện, để tránh sai sót và tiết kiệm thời gian vận hành.

#### Acceptance Criteria

1. WHEN Merchant cập nhật thông tin sản phẩm (giá, mô tả, ảnh, tồn kho) trong Admin_Portal, THE Channel_Manager SHALL đồng bộ thông tin đến tất cả kênh được kết nối (Facebook, TikTok Shop, Shopee, Lazada, Zalo) trong vòng 5 phút.
2. WHEN đơn hàng phát sinh từ bất kỳ kênh nào, THE Channel_Manager SHALL tổng hợp đơn hàng vào hệ thống quản lý trung tâm trong vòng 1 phút và đồng bộ trừ tồn kho tương ứng.
3. THE Channel_Manager SHALL hiển thị trạng thái kết nối và đồng bộ của từng kênh trong Dashboard, cảnh báo ngay khi có kênh mất kết nối hoặc đồng bộ thất bại.
4. IF đơn hàng từ kênh nào đó không thể đồng bộ về hệ thống trung tâm, THEN THE Channel_Manager SHALL ghi log lỗi và thông báo cho Merchant trong vòng 5 phút để xử lý thủ công.
5. THE Channel_Manager SHALL ngăn chặn tình trạng oversell bằng cách đồng bộ tồn kho theo thời gian thực; khi tồn kho về 0, Channel_Manager SHALL tự động ẩn sản phẩm trên tất cả kênh trong vòng 2 phút.
6. WHERE tính năng quản lý giá theo kênh được bật, THE Channel_Manager SHALL cho phép Merchant thiết lập giá khác nhau cho từng kênh bán hàng độc lập với nhau.

---

### Yêu Cầu 16: Admin Portal — Quản Trị Hệ Thống Tổng Hợp

**User Story:** Là một Merchant, tôi muốn có một giao diện quản trị tập trung để quản lý toàn bộ hoạt động kinh doanh (sản phẩm, đơn hàng, khách hàng, nhân viên, tài chính), để vận hành hiệu quả từ một điểm duy nhất.

#### Acceptance Criteria

1. THE Admin_Portal SHALL cung cấp giao diện quản lý sản phẩm cho phép Merchant thêm, sửa, xóa, ẩn/hiện sản phẩm với thay đổi phản ánh ngay lập tức trên tất cả kênh bán hàng.
2. THE Admin_Portal SHALL cung cấp giao diện quản lý đơn hàng cho phép Staff xem, cập nhật trạng thái, in phiếu giao hàng và xử lý hoàn trả cho từng đơn hàng.
3. THE Admin_Portal SHALL cung cấp giao diện quản lý nhân viên cho phép Merchant tạo tài khoản Staff, gán vai trò và phân quyền truy cập theo từng module trong hệ thống.
4. THE Admin_Portal SHALL cung cấp báo cáo tài chính bao gồm doanh thu, chi phí, lợi nhuận gộp, lợi nhuận ròng và dòng tiền, có thể xuất theo mọi khoảng thời gian.
5. WHEN Staff thực hiện bất kỳ thao tác nào trong Admin_Portal, THE Admin_Portal SHALL ghi nhật ký thao tác bao gồm tài khoản thực hiện, thời gian, hành động và dữ liệu thay đổi.
6. THE Admin_Portal SHALL hỗ trợ truy cập trên các thiết bị di động (responsive design) với trải nghiệm đầy đủ tính năng trên màn hình tối thiểu 768px.

---

### Yêu Cầu 17: Security Center — Bảo Mật Hệ Thống

**User Story:** Là một Merchant, tôi muốn hệ thống bảo mật toàn diện để bảo vệ dữ liệu kinh doanh và thông tin khách hàng khỏi các mối đe dọa, đảm bảo tuân thủ quy định bảo mật.

#### Acceptance Criteria

1. THE Security_Center SHALL yêu cầu xác thực hai yếu tố (2FA) cho tài khoản Merchant và cho phép kích hoạt/tắt 2FA cho tài khoản Staff tùy theo chính sách bảo mật của từng cửa hàng.
2. THE Security_Center SHALL mã hóa toàn bộ dữ liệu nhạy cảm (thông tin thanh toán, số điện thoại, địa chỉ) bằng chuẩn AES-256 khi lưu trữ và TLS 1.3 khi truyền dẫn.
3. WHEN phát hiện hành vi đăng nhập bất thường (sai mật khẩu liên tiếp 5 lần trong 10 phút), THE Security_Center SHALL tạm khóa tài khoản trong 30 phút và gửi thông báo cho chủ tài khoản.
4. THE Security_Center SHALL sao lưu toàn bộ dữ liệu hệ thống tự động mỗi ngày và lưu trữ bản sao lưu trong 90 ngày, cho phép Merchant khôi phục dữ liệu tại bất kỳ thời điểm nào trong khoảng đó.
5. THE Security_Center SHALL phân quyền truy cập dựa trên vai trò (RBAC), đảm bảo mỗi tài khoản Staff chỉ truy cập được các module được Merchant cấp phép.
6. THE Security_Center SHALL ghi nhật ký bảo mật đầy đủ cho mọi hoạt động đăng nhập, thay đổi quyền hạn và truy cập dữ liệu nhạy cảm, lưu trữ tối thiểu 12 tháng.
7. WHEN phát hiện lỗ hổng bảo mật hoặc xâm nhập trái phép, THE Security_Center SHALL tự động cách ly tài khoản bị xâm phạm và thông báo cho Merchant ngay lập tức.

---

### Yêu Cầu 18: Kiến Trúc Kỹ Thuật và Khả Năng Mở Rộng

**User Story:** Là một Merchant, tôi muốn hệ thống có kiến trúc ổn định và có khả năng mở rộng, để hệ thống hoạt động tốt kể cả khi lượng người dùng và sản phẩm tăng lớn, và dễ dàng tích hợp dịch vụ mới trong tương lai.

#### Acceptance Criteria

1. THE Platform SHALL vận hành theo kiến trúc microservices, trong đó mỗi module chính (Inventory, CRM, Marketing, AI services) có thể được triển khai và mở rộng độc lập mà không ảnh hưởng đến các module khác.
2. THE Platform SHALL cung cấp REST API và Webhook được tài liệu hóa đầy đủ (chuẩn OpenAPI 3.0) cho phép tích hợp dịch vụ bên ngoài (ERP, kế toán, vận chuyển, thanh toán).
3. THE Platform SHALL lưu trữ tất cả file media (ảnh sản phẩm, ảnh thử đồ, banner) trên Cloud Storage với CDN, đảm bảo thời gian tải ảnh dưới 1 giây cho người dùng tại Việt Nam.
4. THE Platform SHALL duy trì thời gian hoạt động (uptime) tối thiểu 99,5% mỗi tháng, tính riêng cho các dịch vụ API cốt lõi (đặt hàng, thanh toán, kho hàng).
5. THE Platform SHALL xử lý tối thiểu 1.000 yêu cầu API đồng thời mà không suy giảm hiệu năng (thời gian phản hồi API tăng không quá 20% so với điều kiện tải thấp).
6. THE Platform SHALL hỗ trợ mở rộng danh mục sản phẩm sang giày dép, phụ kiện và mỹ phẩm bằng cách thêm danh mục mới mà không yêu cầu thay đổi kiến trúc cốt lõi.
7. THE Platform SHALL cung cấp môi trường sandbox để đối tác tích hợp kiểm thử API mà không ảnh hưởng đến dữ liệu sản xuất.

---

## Thuộc Tính Đúng Đắn (Correctness Properties)

### CP-1: Tính Nhất Quán Tồn Kho (Inventory Invariant)

**Mô tả:** Tổng tồn kho của một SKU phải bằng tổng nhập hàng ban đầu trừ đi tổng số lượng đã bán và số lượng đã điều chuyển ra ngoài, cộng với số lượng điều chuyển vào và hoàn trả.

**Công thức bất biến:**
```
tồn_kho_hiện_tại(SKU) = tồn_kho_ban_đầu(SKU) + tổng_nhập(SKU) + tổng_hoàn_trả(SKU) - tổng_bán(SKU) - tổng_điều_chuyển_ra(SKU) + tổng_điều_chuyển_vào(SKU)
```

**Kiểm tra:** Thuộc tính này phải đúng sau mọi giao dịch (mua bán, nhập hàng, điều chuyển, hoàn trả) và có thể xác minh bằng cách chạy kiểm tra toàn vẹn tồn kho bất kỳ lúc nào.

---

### CP-2: Tính Nhất Quán Điểm Thưởng (Loyalty Points Invariant)

**Mô tả:** Tổng điểm thưởng hiện tại của khách hàng phải bằng tổng điểm tích lũy trừ đi tổng điểm đã sử dụng và điểm đã hết hạn.

**Công thức bất biến:**
```
điểm_hiện_tại(User) = tổng_điểm_tích_lũy(User) - tổng_điểm_sử_dụng(User) - tổng_điểm_hết_hạn(User)
```

**Kiểm tra:** Sau mỗi giao dịch mua hàng hoặc sử dụng điểm, giá trị này phải được duy trì chính xác.

---

### CP-3: Tính Nhất Quán Đồng Bộ Đa Kênh (Cross-Channel Consistency)

**Mô tả:** Thông tin sản phẩm (giá, tồn kho, trạng thái) trên tất cả các kênh bán hàng phải nhất quán với dữ liệu trong hệ thống trung tâm trong khoảng thời gian đồng bộ tối đa 5 phút.

**Bất biến:** Với mọi sản phẩm P và kênh C:
```
|giá_kênh(P, C) - giá_trung_tâm(P)| = 0 (trừ khi cấu hình giá khác nhau theo kênh)
tồn_kho_kênh(P, C) ≤ tồn_kho_trung_tâm(P) (không vượt quá tồn kho thực tế)
```

---

### CP-4: Tính Nhất Quán Tổng Tiền Đơn Hàng (Order Totals Invariant)

**Mô tả:** Tổng giá trị đơn hàng phải bằng tổng giá các sản phẩm sau khi áp dụng giảm giá, cộng phí vận chuyển, trừ voucher và điểm thưởng sử dụng.

**Công thức bất biến:**
```
tổng_đơn_hàng = (Σ đơn_giá_sản_phẩm × số_lượng × (1 - tỷ_lệ_giảm_giá)) + phí_vận_chuyển - giá_trị_voucher - giá_trị_điểm_thưởng
```

**Kiểm tra:** Thuộc tính này phải đúng trong suốt vòng đời đơn hàng từ lúc tạo đến lúc hoàn tất.

---

### CP-5: Tính Idempotent của Đồng Bộ Sản Phẩm (Channel Sync Idempotence)

**Mô tả:** Gửi lệnh đồng bộ sản phẩm lên kênh bán hàng nhiều lần phải cho kết quả giống như gửi một lần — trạng thái cuối cùng trên kênh phải giống nhau dù lệnh được gửi bao nhiêu lần.

**Bất biến:** f(sync(P, C)) = f(f(sync(P, C))) với mọi sản phẩm P và kênh C.

---

### CP-6: Tính Nhất Quán Phân Quyền (Access Control Consistency)

**Mô tả:** Mọi yêu cầu truy cập tài nguyên phải được kiểm tra quyền theo đúng vai trò được gán, không có ngoại lệ hay bypass.

**Bất biến:** Với mọi tài nguyên R và tài khoản Staff S:
```
truy_cập(S, R) = true ⟺ quyền(vai_trò(S), R) = ALLOW
```

---

### CP-7: Tính Round-Trip của Dữ Liệu Sản Phẩm (Product Data Round-Trip)

**Mô tả:** Dữ liệu sản phẩm được tuần tự hóa (serialize) để gửi lên kênh bán hàng, sau đó deserialize về hệ thống trung tâm phải cho kết quả tương đương với dữ liệu gốc.

**Bất biến:**
```
deserialize(serialize(product)) ≡ product
```

**Áp dụng cho:** Tích hợp API với Shopee, Lazada, TikTok Shop; import/export catalog sản phẩm dạng CSV/JSON.

---

### CP-8: Tính Toàn Vẹn Nhật Ký Bảo Mật (Audit Log Completeness)

**Mô tả:** Mọi thao tác thay đổi dữ liệu trong hệ thống phải có ít nhất một bản ghi tương ứng trong nhật ký bảo mật, không có thao tác nào không được ghi lại.

**Bất biến:** |{thao_tác}| ≤ |{bản_ghi_nhật_ký}| (mọi thao tác đều có ít nhất một bản ghi log tương ứng).


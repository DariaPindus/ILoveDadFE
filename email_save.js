		let email = `From: Sender <daria.pindus@gmail.com>
To: <dasha.custom.personal@gmail.com>
Subject: Test raw.
Content-Type: multipart/related;
	boundary="${boundary}";
	type="text/html"

--${boundary}
Content-Type: text/html; charset="us-ascii"
Content-Transfer-Encoding: quoted-printable

<html>
<head></head>
<body>
<img src="cid:${contentId}"><br>
The deal you want
</body>
</html>

--${boundary}
Content-Type: image/jpeg
Content-Transfer-Encoding: base64
Content-ID: <${contentId}>


${this.state.file}
--${boundary}--`;


let email = `From: Sender <daria.pindus@gmail.com>
To: <dasha.custom.personal@gmail.com>
Subject: Test raw.
Content-Type: multipart/related;
	boundary="${boundary}";
	type="text/html"

--${boundary}
Content-Type: text/html; charset="us-ascii"
Content-Transfer-Encoding: quoted-printable

<html>
<head></head>
<body>
<img src="cid:${contentId}"><br>
The deal you want
</body>
</html>

--${boundary}
Content-Type: image/jpeg
Content-Transfer-Encoding: base64
Content-ID: <${contentId}>


${this.state.file}
--${boundary}--`;
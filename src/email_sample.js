let mess = `From: "Sender Name" <daria.pindus@gmail.com>
To: dasha.custom.personal@gmail.com
Subject: TEst raaaaw
Content-Type: multipart/mixed;
    boundary="${boundary}"

--${boundary}
Content-Type: multipart/alternative;
    boundary="sub_${boundary}"

--sub_${boundary}
Content-Type: text/plain; charset=iso-8859-1
Content-Transfer-Encoding: quoted-printable

Посмотрите на этого котенка

--sub_${boundary}
Content-Type: text/html; charset=iso-8859-1
Content-Transfer-Encoding: quoted-printable

<html>
<head></head>
<body>
<h1>Hello!</h1>
<p>Посмотрите на этого котенка.</p>
</body>
</html>

--sub_${boundary}--

${containsImage ? '--' + boundary +'\n' +  
'Content-Type: image/jpeg\n' + 
'Content-Disposition: attachment;filename="' + this.state.file + '";\n'
'Content-Transfer-Encoding: base64\n' + 
'Content-ID: <' + contentId + '>\n\n' + 
this.state.file.data + '\n': ''}

--${boundary}--`;





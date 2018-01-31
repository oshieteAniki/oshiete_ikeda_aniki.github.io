var defpos = [ 35.862160, 136.367295, "ツリーピクニックアドベンチャーいけだ" ];
var viewlen = 50;
var maxlen = 50;
var dllpoi = 0.1;

var gpson = true;

var anikiMode = false;

var comments=[];

//バス停---------------------------------
var busStops=[
	{
		company:"京福",
		to:"福井駅",
		stops:[
			["松ヶ谷",136.3590686,35.9442001,
				["7:08	16:13","9:07"]],
			["白粟",136.3619788,35.9369644,
				["7:06	16:11","9:05"]],
			["野尻",136.3520305,35.918933,
				["7:02	16:07","9:01"]],
			["谷口第1",136.3573936,35.903786,
				["7:00	16:05","8:59"]],
			["谷口",136.3561195,35.9009833,
				["6:59	16:04","8:58"]],
			["薮田橋",136.3532026,35.898325,
				["6:58	16:03","8:57"]],
			["薮田",136.3482486,35.8943336,
				["6:57	16:02","8:56"]],
			["役場入口",136.3456294,35.8904538,
				["6:56	16:01","8:55"]],
			["稲荷中央",136.3440241,35.8881309,
				["6:55	16:00","8:54"]],
			["稲荷",136.3434407,35.885508,
				["6:55	16:00","8:54"]]
		]
	},
	{
		company:"福鉄",
		to:"武生駅",
		stops:[
			["野尻",136.3520305,35.918933,
				["6:48	8:48	12:38	14:48	17:43	19:43","8:48	14:48	17:43"]],
			["谷口門前",136.357352,35.9053035,
				["6:45	8:45	12:41	14:45	17:46	19:46","8:45	14:45	17:46"]],
			["谷口",136.3559264,35.9008747,
				["6:44	8:44	12:42	14:44	17:47	19:47","8:44	14:44	17:47"]],
			["薮田橋",136.3532026,35.898325,
				["6:43	8:43	12:43	14:43	17:48	19:48","8:43	14:43	17:48"]],
			["薮田",136.3481909,35.8942716,
				["6:42	8:42	12:44	14:42	17:49	19:49","8:42	14:42	17:49"]],
			["稲荷",136.343497,35.8866793,
				["6:40	8:40	12:51	14:40	17:56	19:53","8:40	14:40	17:56"]],
			["寺島",136.3404581,35.884491,
				["6:34	8:34	12:52	14:34	17:57	19:54","8:34	14:34	17:57"]],
			["市",136.3365112,35.8816181,
				["6:33	8:33	12:53	14:33	17:58	19:55","8:33	14:33	17:58"]],
			["荒谷",136.3346699,35.8809302,
				["6:33	8:33	12:53	14:33	17:58	19:55","8:29	14:29	17:58"]],
			["池田分校前",136.337623,35.8864251,
				["6:31	8:31	12:55	14:31	18:00	19:57","8:31	14:31	18:00"]],
			["上荒谷",136.3315076,35.8754622,
				["6:28	8:28	12:58	14:28	18:03	20:00","8:28	14:28	18:03"]],
			["定方",136.3216504,35.8663357,
				["6:26	8:26	13:00	14:26	18:05	20:02","8:26	14:26	18:05"]],
			["東角間",136.3200666,35.8636817,
				["6:25	8:25	13:01	14:25	18:06	20:03","8:25	14:25	18:06"]],
			["西角間",136.3169459,35.8614275,
				["6:24	8:24	13:02	14:24	18:07	20:04","8:24	14:24	18:07"]],
			["菅生",136.3065764,35.8574907,
				["6:22	8:22	13:04	14:22	18:09	20:06","8:22	14:22	18:09"]],
			["魚見",136.2933947,35.8568603,
				["6:20	8:20	13:06	14:20	18:11	20:08","8:20	14:20	18:11"]]
		],
	},
	{
		company:"春夏秋遊",
		to:"武生駅",
		stops:[
			["こってコテいけだ前",136.3450259,35.8927484,
				["12:25	16:55","12:25	16:55"]],
			["冠荘・TPA",136.364665,35.8642044,
				["12:26	16:56","12:26	16:56"]]
		],
	}
];
//--------------------------------------

function loadSheet(data) {
	var e=data.feed.entry;
	for(var i=0;i<e.length;i++){
		var row=parseInt(e[i].gs$cell.row);
		var col=parseInt(e[i].gs$cell.col);
		var t=e[i].gs$cell.$t;
		while(comments.length<row){
			comments.push([]);
		}
		while(comments[row-1].length<col) {
			comments[row-1].push('');
		}
		comments[row-1][col-1]=t;
	}
}

var proxyImageSSL = function(img) {
	if (img && img != "noimage" && img.indexOf("https://") == -1) { // 非ssl画像チェック
//		alert(img);
		img = "https://api.odp.jig.jp/image/cache_ssl?url=" + encodeURIComponent(img);
//		alert(img);
//		http://www.city.muroran.lg.jp/main/org1400/images/s-matsuri_251.jpg
	/*
		https://api.odp.jig.jp/image/cache_ssl?url=http://www.city.muroran.lg.jp/main/org1400/images/s-matsuri_241.jpg
	*/
	}
	return img;
};

var addItem = function(s, img, list, distance, icon, type, ikedaicon) {
	var li = create("li");
	var div = create("div");
	div.className = "collapsible-header";
	li.appendChild(div);

	img = proxyImageSSL(img);

	if(ikedaicon){
		var span2 = create("span");
		span2.className = "icon";
		div.appendChild(span2);
		span2.style.backgroundImage = "url(img/ikedaicons/" + ikedaicon + ")";
		span2.style.backgroundRepeat = "no-repeat";
		span2.style.backgroundSize = "contain";
	}else if (img) {
		if (img != "noimage") {
			var span2 = create("span");
			span2.className = "icon";
			div.appendChild(span2);
			span2.style.backgroundImage = "url(" + img + ")";
		}
	} else if (icon == "warning") {
		var img = "img/icon_emergency2.png";
		var span2 = create("span");
		span2.className = "icon";
		div.appendChild(span2);
		span2.style.backgroundImage = "url(" + img + ")";
	} else {
		var span2 = create("span");
		span2.className = "icon";
		div.appendChild(span2);
		span2.className = "materialicon";
		if (!icon)
			icon = "broken_image";// warning
		span2.innerHTML = "<i class=material-icons>" + icon + "</i>";
	}
	var span = create("span");
	span.className = "days";
	div.appendChild(span);
	span.textContent = s;

	if (distance) {
		var span3 = create("span");
		span3.className = "distance";
		span.appendChild(span3);
		span3.innerHTML += fixfloat(distance, 2) + "km";
	}

	if (list) {
		var div2 = create("div");
		div2.className = "collapsible-body";
		li.appendChild(div2);
		for (var i = 0; i < list.length; i++) {
			if (list[i]) {
				var d = create("div");
				d.innerHTML = list[i];
				div2.appendChild(d);
				if (i == 2) {
					span3.innerHTML = list[2].substring(0, 10) + "...<br>" + span3.innerHTML; 
				}
			}
		}
	}
	if (type) {
		if (type == "http://purl.org/jrrk#PublicToilet") {
			span3.innerHTML = "公衆トイレ<br>" + span3.innerHTML; 
			div.style.color = "rgb(43,189,215)";
		}
	}
	get("items").appendChild(li);
	return li;
};
var getLinkDirections = function(lat1, lng1, lat2, lng2) {
	return "https://www.google.com/maps/dir/" + lat1 + "," + lng1 + "/" + lat2 + "," + lng2;
};
var getStaticMap = function(lat, lng, lat2, lng2) {
	var APIKEY = "AIzaSyDdH8sQCN7d4DqkHfVntsDOxiNVTgKuOos";
	var s = "https://maps.googleapis.com/maps/api/staticmap?";
	s += "key=" + APIKEY + "&";
	s += "size=600x300&scale=2&maptype=roadmap&";
	s += "markers=color:blue%7Clabel:P%7C" + lat + "," + lng + "&"
	s += "markers=color:red%7Clabel:D%7C" + lat2 + "," + lng2 + "&";
	s += "sensor=false";
	return "<img width=100% src='" + s + "'>";
};
var getHTMLMap = function(lat, lng, lat2, lng2) {
	var dir = getLinkDirections(lat, lng, lat2, lng2);
	var img = getStaticMap(lat, lng, lat2, lng2);
	return "<a href='" + dir + "' target=_blank>" + img + "</a>";
};

var getDataSrc = function(type) {
	if (type == "http://purl.org/jrrk#CivicPOI")
		return "観光オープンデータ";
	if (type == "http://odp.jig.jp/odp/1.0#TourSpot")
		return "公共クラウド観光データ";
	if (type == "http://purl.org/jrrk#EmergencyFacility")
		return "避難所";
	if (type == "http://purl.org/jrrk#PublicToilet") {
		return "公衆トイレ";
	}
	return type;
};
var getNearWithGeo = function(lat, lng, size, callback) {
	// type
	// http://purl.org/jrrk#CivicPOI
	// http://odp.jig.jp/odp/1.0#TourSpot
	var typepoi = [
		"http://purl.org/jrrk#CivicPOI",
		"http://odp.jig.jp/odp/1.0#TourSpot",
		"http://purl.org/jrrk#PublicToilet"
	];
	getNearTypesWithGeoMulti(typepoi, lat, lng, dllpoi, size, function(pois) {
		var data = [];
		for (var i = 0; i < pois.length; i++)
			data.push(pois[i]);
		callback(data);
	});
};
var getNearTypesWithGeoMulti = function(types, lat, lng, dll, size, callback) {
	getNearTypesWithGeo(types, lat, lng, dll / 10, size * 2, function(d) {
		if (d.length >= size) {
			callback(d);
			return;
		}
		getNearTypesWithGeo(types, lat, lng, dll / 2, size * 2, function(d2) {
			for (var i = 0; i < d2.length; i++)
				d.push(d2[i]);
			if (d.length > 0) {
				callback(d);
				return;
			}
			getNearTypesWithGeo(types, lat, lng, dll * 100, size, callback);
		});
	});
};
var getNearTypesWithGeo = function(types, lat, lng, dll, size, callback, order) {
	lat = parseFloat(lat);
	lng = parseFloat(lng);
	var latmin = lat - dll;
	var latmax = lat + dll;
	var lngmin = lng - dll;
	var lngmax = lng + dll;

	var q = f2s(function() {/*
		prefix geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
		prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
		prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		prefix xsd: <http://www.w3.org/2001/XMLSchema#>
		prefix schema: <http://schema.org/>
		select ?s ?name ?desc ?descen ?link ?img ?lat ?lng ?type {
			?s rdf:type ?type;
				rdfs:label ?name;
				geo:lat ?lat;
				geo:long ?lng.
			optional { ?s <http://schema.org/image> ?img }
			optional {
				?s <http://schema.org/description> ?desc.
				filter(lang(?desc)="$LANG$")
			}
			optional {
				?s <http://schema.org/description> ?descen.
				filter(lang(?descen)="en")
			}
			optional { ?s <http://schema.org/url> ?link }
			$FILTER$
			filter(lang(?name)="$LANG$")
			filter(xsd:float(?lat) < $LAT_MAX$ && xsd:float(?lat) > $LAT_MIN$ && xsd:float(?lng) < $LNG_MAX$ && xsd:float(?lng) > $LNG_MIN$)
		} $ORDER$ limit $SIZE$
	*/});
	/*
	filter(?type=<http://odp.jig.jp/odp/1.0#TourSpot>)
	filter(?type=<http://odp.jig.jp/odp/1.0#TourSpot> || ?type=<http://purl.org/jrrk#CivicPOI>)

	filter(?type=<http://odp.jig.jp/odp/1.0#TourSpot> || ?type=<http://purl.org/jrrk#CivicPOI> || ?type=<http://purl.org/jrrk#EmergencyFacility>)
	*/

	order = "";

	q = q.replace(/\$ORDER\$/g, order);
	q = q.replace(/\$SIZE\$/g, size);
//	q = q.replace(/\$TYPE\$/g, type);
	q = q.replace(/\$LANG\$/g, "ja");
	q = q.replace(/\$LAT_MAX\$/g, latmax);
	q = q.replace(/\$LAT_MIN\$/g, latmin);
	q = q.replace(/\$LNG_MAX\$/g, lngmax);
	q = q.replace(/\$LNG_MIN\$/g, lngmin);

	var ts = [];
	for (var i = 0; i < types.length; i++)
		ts[i] = "?type=<" + types[i] + ">";
	var filter = "filter(" + ts.join(" || ") + ")\n";
	q = q.replace(/\$FILTER\$/g, filter);

	var baseurl = "https://sparql.odp.jig.jp/data/sparql";
	querySPARQL(baseurl, q, function(data) {
		callback(toList(data));
	});
};
var toList = function(data) {
	var items = data.results.bindings;
	var list = [];
	for (var uri in items) {
		var it = items[uri];
		var d = {};
		for (var v in it) {
			d[v] = it[v].value;
		}
		list.push(d);
	}
	return list;
};

var ignoreGPS = function() {
	alert("位置が取得できません。\n" + defpos[2] + "にいるとして調べます");
	showItems(defpos[0], defpos[1]);
};
var getDistance = function(lat1, lng1, lat2, lng2) {
	var dlat = (lat2 - lat1) * Math.PI / 180;
	var dlng = (lng2 - lng1) * Math.PI / 180;
	var a = Math.sin(dlat / 2) * Math.sin(dlat / 2)
		+ Math.cos(lat1 * Math.PI / 180)
		* Math.cos(lat2 * Math.PI / 180)
		* Math.sin(dlng / 2) * Math.sin(dlng / 2);
	return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 6371; // 6371 = R of the Earth in km
};
// material icon
// report, new_releases, explicit, error, error_outline, warning, announcement
var showItems = function(lat, lng) {
	getNearWithGeo(lat, lng, maxlen, function(data) {
		clear("items");
		//		dump(data);
		var names = {};
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			var name = d.name; //.trim();
			var dp = names[name];
			if (dp) {
				if (dp.img == null && d.img) {
					names[name] = d;
				}
			} else {
				names[name] = d;
			}
		}
		data = [];
		for (var n in names) {
			data.push(names[n]);
		}
		
		//バス停--------------------------
		for(var i=0;i<busStops.length;i++){
			var min,near=-1;
			var stops=busStops[i].stops;
			for(var j=0;j<stops.length;j++){
				var dist=getDistance(lat,lng,stops[j][2],stops[j][1]);
				if(j==0||dist<min){
					near=j;
					min=dist;
				}
			}
			if(near!=-1){
				var tt="";
				var hei=stops[near][3][0].split("\t");
				if(hei.length>0){
					tt+="平日<br>";
					for(var j=0;j<hei.length;j++){
						tt+=hei[j]+"<br>";
					}
				}
				var syuku=stops[near][3][1].split("\t");
				if(syuku.length>0){
					tt+="土日祝<br>";
					for(var j=0;j<syuku.length;j++){
						tt+=syuku[j]+"<br>";
					}
				}
				data.push({
					name:"🚏"+busStops[i].to+"行バス停",
					lat:stops[near][2],
					lng:stops[near][1],
					desc:busStops[i].company+"バス "+stops[near][0]+"<br>"+tt
				});
			}
		}
		//-------------------------------


		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			d.distance = getDistance(lat, lng, d.lat, d.lng);
		}
		data.sort(function(a, b) {
			return a.distance - b.distance;
		});
		var n = 0;
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			var icons=[
				["かずら橋","kazura.jpg"],
				["白山神社のお面さんまつり","noumen.jpg"],
				["能面美術館","noumen.jpg"],
				["ファームハウス・コムニタ","syukuhaku.jpg"],
				["稲荷の大杉","oosugi.jpg"],
				["堀口家","horiguchi.jpg"],
				["歩々","hoho.jpg"],
				["こってコテいけだ","komunita.jpg"],
				["木工体験","mokkou.jpg"],
				["WoodLabe-Ikeda","woodlabo.jpg"],
				["ふるさと道場","soba.jpg"],
				["渓流温泉冠荘","onsen.jpg"],
				["池田町能面美術館","noumen.jpg"],
				["田楽能舞","noumen.jpg"],
				["水車","soba.jpg"],
				["しらほ食堂","komunita.jpg"],
				["おもちの母屋","komunita.jpg"],
				["喫茶　香","komunita.jpg"],
				["足羽川","kawa.jpg"],
				["ツリーピクニックアドベンチャーいけだ","tpa.jpg"],
				["昭扇閣　べにや","syukuhaku.jpg"],
				["鵜甘神社","torii.jpg"],
				["須波阿須疑神社","torii.jpg"],
				["須波阿須疑神社","torii.jpg"],
				["おもちゃハウス　こどもと木","ki.jpg"]
			];
			var anikiSpot = false;
			for(var j=0;j<comments.length;j++){
				if(d.name==comments[j][0]){
					d.desc+="<br><br><b><font color=\"#FFFF00\"><span style=\"border:1px solid\">アニキのオススメポイント</span><br>「"+comments[j][1]+"」</font></b>";
					anikiSpot = true;
				}
			}
			for(var j=0;j<icons.length;j++){
				if(d.name==icons[j][0]){
					d.ikedaicon=icons[j][1];
				}
				if(d.type=="http://purl.org/jrrk#PublicToilet"){
					d.ikedaicon="toile.jpg";
				}
			}
			if (anikiMode && !anikiSpot) {
				continue;
			}
			var item = addItemSpot(d, lat, lng);
			item.data = d;
			if (d.type == "http://purl.org/jrrk#EmergencyFacility" || n >= viewlen) {
				item.style.display = "none";
			} else {
				n++;
			}
		}
		if (n == 0) {
			alert("近くに観光オープンデータがないようです");
		}
		var emergencymode = false;
		var emelink = null;
	});
};
var getImageLink = function(img) {
	if (!img)
		return null;
	img = proxyImageSSL(img);
	return "<a href=" + img + " target=_blank><img width=100% src=" + img + "></a>";
};
var getLink = function(label, url) {
	if (!url)
		return label;
	return "<a href='" + url + "' target=_blank>" + label + "</a>";
};
var addItemSpot = function(d, lat, lng) {
	var icon = null;
	if (d.type == "http://purl.org/jrrk#EmergencyFacility")
		icon = "warning";
	return addItem(d.name/*.substring(0, 6)*/, d.img, [
		getLink(d.name + (d.link ? '<i class="material-icons">home</i>' : ""), d.link),
		getImageLink(d.img),
		d.desc,
		d.descen,
		getHTMLMap(lat, lng, d.lat, d.lng),
		getLink(getDataSrc(d.type), d.s),
	], d.distance, icon, d.type, d.ikedaicon);
};

//localStorage.setItem("akijikan-init", "0");
$(function() {
	var naniki = 2;
	setInterval(function() {
		get("aniki").src = "img/icon_aniki" + naniki + ".png";
		naniki = naniki == 2 ? 1 : 2;
	}, 500);

	if ("1" != localStorage.getItem("akijikan-init")) {
		get("splash").style.display = "block";
		get("splash").onclick = function() {
			get("splash").style.display = "none";
			localStorage.setItem("akijikan-init", "1");
		};
	}

	var hash = document.location.hash;
	if (hash.length > 1) {
		var pos = hash.substring(1).split(",");
		if (pos.length == 3 && pos[2] == "aniki") {
			anikiMode = true;
			dllpoi = 1;
			maxlen = 100;
		}
		if (pos && pos.length == 2) {
			showItems(pos[0], pos[1]);
			return;
		}
	}
	if (!gpson) {
		ignoreGPS();
		return;
	}

	get("logo-container").onclick = loadItem;
	loadItem();
});
var loadItem = function() {
	clear("items");
	addItem("付近のデータ取得中...", "noimage");

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			function(pos) {
				var lat = pos.coords.latitude;
				var lng = pos.coords.longitude;
				showItems(lat, lng);
			},
			function(err) {
				var errmes = [ "", "許可されてません", "判定できません", "タイムアウト" ];
				console.log(errmes[err]);
				ignoreGPS();
			},
			{
				enableHighAccuracy: true,
				timeout: 10000, // タイムアウト10秒
				maximumAge: 0 // nmsec前のデータを使う、0でキャッシュしない
			}
		);
	} else {
		ignoreGPS();
	}
};

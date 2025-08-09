const playlistUrl = "https://raw.githubusercontent.com/cfshorts/All-sports/refs/heads/main/all_sports_new%20(1).m3u";

async function loadChannels() {
    const res = await fetch(playlistUrl);
    const text = await res.text();
    const lines = text.split('\n');
    const grid = document.getElementById('channelGrid');

    let channels = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('#EXTINF')) {
            const name = lines[i].split(',')[1] || "Unknown";
            const logoMatch = lines[i].match(/tvg-logo="(.*?)"/);
            const logo = logoMatch ? logoMatch[1] : "";
            const url = lines[i + 1] || "";
            channels.push({ name, logo, url });
        }
    }

    function render(list) {
        grid.innerHTML = "";
        list.forEach(ch => {
            const div = document.createElement('div');
            div.className = 'channel';
            div.innerHTML = `<a href="${ch.url}" target="_blank">
                                <img src="${ch.logo}" alt="${ch.name}">
                                <div class="channel-name">${ch.name}</div>
                             </a>`;
            grid.appendChild(div);
        });
    }

    render(channels);

    document.getElementById('searchBar').addEventListener('input', e => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = channels.filter(ch => ch.name.toLowerCase().includes(searchTerm));
        render(filtered);
    });
}

loadChannels();

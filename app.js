import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Create a single supabase client for interacting with your database
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tYWRlcHVpaGN4Y2JlaGdhcHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyOTk5NzcsImV4cCI6MjA2NDg3NTk3N30.zVKwTFmeKkbIn9u6MAuHbct157fIpvBaMCK3CCl4vTI';
const supabase = createClient('https://omadepuihcxcbehgappc.supabase.co', anonKey);

const country = document.getElementById('country');
const city = document.getElementById('city');
const gyms = document.getElementById('gyms-list');

country.addEventListener('click', async () => {

    const { data, error } = await supabase
        .from('gyms')
        .select('city')
        .eq('country', country.value);

        const cities = [...new Set(data.map((x) => x.city))];
        city.innerHTML = '<option>--Choose a city--</option>';

        for (const c of cities) {
            const option = city.appendChild(document.createElement('option'));
            option.value = c;
            option.textContent = c;
        }
});

document.getElementById('submit').addEventListener('click', async () => {

    gyms.innerHTML = '';

    const { data, error } = await supabase
        .from('gyms')
        .select('name,city,website')
        .eq('city', city.value);

    if (data.length) {
        console.log(data[0].website);
        gyms.appendChild(document.createElement('li')).textContent = data[0].name;
    } else {
        console.log('no data found');;
    }

});
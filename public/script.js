console.log("前端成功載入");

// Default: sort by date, descending (newest first)
let isAscending = false;

document.addEventListener('DOMContentLoaded', () => {
	const addBtn = document.getElementById('addBtn');
	const yearInput = document.getElementById('yearInput');
	const monthInput = document.getElementById('monthInput');
	const dayInput = document.getElementById('dayInput');
	const productInput = document.getElementById('product');
	const priceInput = document.getElementById('price');
	const searchInput = document.getElementById('searchInput');


	const onlyDigits = (value) => String(value || '').replace(/\D/g, '');

	const focusAndSelect = (input) => {
		if (!input) return;
		input.focus();
		input.select();
	};

	const moveForward = (currentInput, nextInput, maxLength) => {
		currentInput.addEventListener('input', () => {
			const digits = onlyDigits(currentInput.value).slice(0, maxLength);
			if (currentInput.value !== digits) {
				currentInput.value = digits;
			}

			if (digits.length >= maxLength) {
				focusAndSelect(nextInput);
			}
		});

		currentInput.addEventListener('keydown', (ev) => {
			if (ev.key === 'Backspace' && currentInput.value.length === 0 && nextInput) {
				ev.preventDefault();
				focusAndSelect(nextInput);
			}
		});
	};

	if (yearInput && monthInput && dayInput) {
		moveForward(yearInput, monthInput, 4);
		moveForward(monthInput, dayInput, 2);

		yearInput.addEventListener('input', () => {
			yearInput.value = onlyDigits(yearInput.value).slice(0, 4);
		});
		monthInput.addEventListener('input', () => {
			monthInput.value = onlyDigits(monthInput.value).slice(0, 2);
		});
		dayInput.addEventListener('input', () => {
			dayInput.value = onlyDigits(dayInput.value).slice(0, 2);
		});

		yearInput.addEventListener('keydown', (ev) => {
			if (ev.key === 'Tab' || ev.key === 'ArrowRight') return;
			if (ev.key === 'Enter' && yearInput.value.length >= 4) {
				ev.preventDefault();
				focusAndSelect(monthInput);
			}
		});

		monthInput.addEventListener('keydown', (ev) => {
			if (ev.key === 'Tab' || ev.key === 'ArrowRight') return;
			if (ev.key === 'Enter' && monthInput.value.length >= 2) {
				ev.preventDefault();
				focusAndSelect(dayInput);
			}
		});
	}

	addBtn.addEventListener('click', async () => {
		const year = onlyDigits(yearInput && yearInput.value).padStart(4, '0');
		const month = onlyDigits(monthInput && monthInput.value).padStart(2, '0');
		const day = onlyDigits(dayInput && dayInput.value).padStart(2, '0');
		const date = `${year}-${month}-${day}`;
		const name = productInput.value && productInput.value.trim();
		const price = priceInput.value;

		if (year.length !== 4 || month.length !== 2 || day.length !== 2 || !name || price === '' || price === null) {
			alert('請填寫日期、商品名稱與價格');
			return;
		}

		const payload = { date, name, price: Number(price) };

		try {
			const resp = await fetch('/api/prices', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});
			if (!resp.ok) {
				const err = await resp.json().catch(() => ({}));
				alert('新增失敗: ' + (err.error || resp.statusText));
				return;
			}
			// 成功
			yearInput.value = '';
			monthInput.value = '';
			dayInput.value = '';
			productInput.value = '';
			priceInput.value = '';
			focusAndSelect(yearInput);
			loadPrices();
		} catch (e) {
			console.error('Fetch error:', e);
			alert('網路錯誤，無法新增資料');
		}
	});

	searchInput.addEventListener('input', function () {
		loadPrices(this.value);
	});

	// 初始載入
	loadPrices();
});

async function loadPrices(keyword) {
	const tbody = document.getElementById('priceTable');
	tbody.innerHTML = '<tr><td colspan="4">載入中...</td></tr>';

	let url = '/api/prices';
	if (keyword && String(keyword).trim() !== '') {
		url += '?q=' + encodeURIComponent(keyword.trim());
	}

	try {
		const resp = await fetch(url);
		if (!resp.ok) {
			tbody.innerHTML = `<tr><td colspan="3">取得資料失敗: ${resp.status}</td></tr>`;
			return;
		}
		let data = await resp.json();
		// Normalize types: ensure price is numeric and date is string
		data = data.map(d => ({
			...d,
			price: Number(d.price ?? 0),
			date: String(d.date ?? ''),
		}));
		if (!Array.isArray(data) || data.length === 0) {
			tbody.innerHTML = '<tr><td colspan="4">尚無資料</td></tr>';
			updateRecordCount(0);
			return;
		}

		updateRecordCount(data.length);

// Sort by date descending (newest first) by default
		try {
			data.sort((a, b) => {
				const da = (a.date || '');
				const db = (b.date || '');
				if (da === db) return 0;
				if (isAscending) return da < db ? -1 : 1;
				return da < db ? 1 : -1;
			});
		} catch (e) {
			console.warn('Sort error:', e);
		}

		tbody.innerHTML = '';
		for (const row of data) {
			const tr = document.createElement('tr');
			const tdDate = document.createElement('td');
			const tdName = document.createElement('td');
			const tdPrice = document.createElement('td');
			const tdAction = document.createElement('td');
			const deleteBtn = document.createElement('button');
			tdDate.textContent = row.date || '';
			tdName.textContent = row.name || '';
			tdPrice.textContent = row.price !== undefined ? String(row.price) : '';
			deleteBtn.type = 'button';
			deleteBtn.className = 'delete-btn';
			deleteBtn.textContent = '刪除';
			deleteBtn.addEventListener('click', () => deletePrice(row.id));
			tdAction.appendChild(deleteBtn);
			tr.appendChild(tdDate);
			tr.appendChild(tdName);
			tr.appendChild(tdPrice);
			tr.appendChild(tdAction);
			tbody.appendChild(tr);
		}
	} catch (e) {
		console.error('Load prices error:', e);
		tbody.innerHTML = '<tr><td colspan="4">載入發生錯誤</td></tr>';
	}
}



function updateRecordCount(count) {
	const countDisplay = document.getElementById('recordCount');
	if (countDisplay) {
		countDisplay.textContent = `目前共有 ${count} 筆珍奶價格紀錄`;
	}
}

async function deletePrice(id) {
	if (!confirm('確定要刪除這筆珍奶紀錄嗎？')) {
		return;
	}

	try {
		const resp = await fetch(`/api/prices/${id}`, {
			method: 'DELETE',
		});

		if (!resp.ok) {
			const err = await resp.json().catch(() => ({}));
			alert('刪除失敗: ' + (err.error || resp.statusText));
			return;
		}

		loadPrices(document.getElementById('searchInput')?.value || '');
	} catch (e) {
		console.error('Delete error:', e);
		alert('網路錯誤，無法刪除資料');
	}
}
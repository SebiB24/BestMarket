// Ex 3 ------------------------------------------------------------------
document.querySelectorAll('thead th').forEach(th => {
    let isAsc = true;

    th.addEventListener('click', () => {
        const table = th.closest('.compare-table');
        const body = table.querySelector('tbody');
        const columnIndex = Array.from(th.parentElement.children).indexOf(th);
        const rows = Array.from(body.querySelectorAll('tr'));

        rows.sort((a, b) => {
            const aText = a.children[columnIndex].textContent.trim();
            const bText = b.children[columnIndex].textContent.trim();
            if(isAsc) 
                return aText.localeCompare(bText, undefined, { numeric: true });
            else
                return bText.localeCompare(aText, undefined, { numeric: true });
        });
        isAsc = !isAsc;
        body.append(...rows);
    });
});
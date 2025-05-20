// Диагностический скрипт для проверки путей к директориям клиента
const fs = require('fs');
const path = require('path');

// Текущий рабочий каталог
console.log('Текущий рабочий каталог:', process.cwd());
console.log('Директория скрипта (__dirname):', __dirname);

// Путь к предполагаемой директории клиента (относительно текущего скрипта)
const clientPath = path.resolve(__dirname, '../client/dist');
console.log('\nПроверка пути к директории клиента:', clientPath);

// Проверяем, существует ли директория
if (fs.existsSync(clientPath)) {
    console.log('✅ Директория клиента НАЙДЕНА');
    
    // Проверяем содержимое директории
    try {
        const files = fs.readdirSync(clientPath);
        console.log('\nСодержимое директории клиента:');
        files.forEach(file => {
            const filePath = path.join(clientPath, file);
            const stats = fs.statSync(filePath);
            console.log(`- ${file} (${stats.isDirectory() ? 'директория' : 'файл'})`);
        });
        
        // Проверяем наличие важных файлов
        const indexHtmlPath = path.join(clientPath, 'index.html');
        if (fs.existsSync(indexHtmlPath)) {
            console.log('\n✅ index.html НАЙДЕН');
            
            // Проверяем права доступа
            try {
                fs.accessSync(indexHtmlPath, fs.constants.R_OK);
                console.log('✅ Права на чтение index.html: ЕСТЬ');
            } catch (err) {
                console.error('❌ Ошибка прав доступа к index.html:', err.message);
            }
        } else {
            console.error('❌ index.html НЕ НАЙДЕН');
        }
    } catch (err) {
        console.error('\n❌ Ошибка при чтении директории клиента:', err.message);
    }
} else {
    console.error('❌ Директория клиента НЕ НАЙДЕНА');
    
    // Проверяем родительскую директорию
    const parentPath = path.resolve(__dirname, '../client');
    console.log('\nПроверка родительской директории:', parentPath);
    
    if (fs.existsSync(parentPath)) {
        console.log('✅ Директория ../client НАЙДЕНА');
        
        // Смотрим, какие поддиректории есть
        try {
            const parentFiles = fs.readdirSync(parentPath);
            console.log('\nСодержимое директории ../client:');
            parentFiles.forEach(file => {
                const filePath = path.join(parentPath, file);
                const stats = fs.statSync(filePath);
                console.log(`- ${file} (${stats.isDirectory() ? 'директория' : 'файл'})`);
            });
        } catch (err) {
            console.error('\n❌ Ошибка при чтении родительской директории:', err.message);
        }
    } else {
        console.error('❌ Директория ../client НЕ НАЙДЕНА');
    }
}

// Проверка других возможных путей для директории сборки клиента
const altClientPaths = [
    path.resolve(__dirname, '../client/build'),
    path.resolve(__dirname, './client/dist'),
    path.resolve(__dirname, './client/build'),
    path.resolve(process.cwd(), './client/dist'),
    path.resolve(process.cwd(), '../client/dist')
];

console.log('\nПроверка альтернативных путей к директории клиента:');
altClientPaths.forEach(altPath => {
    console.log(`Проверка ${altPath}:`, fs.existsSync(altPath) ? '✅ НАЙДЕНА' : '❌ НЕ НАЙДЕНА');
});
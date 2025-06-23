class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }

    getBookInfo() {
        return `Назва: ${this.title}, Автор: ${this.author}, Рік: ${this.year}`;
    }
}
class EBook extends Book {
    constructor(title, author, year, fileSize) {
        super(title, author, year);
        this.fileSize = fileSize;
    }

    getBookInfo() {
        const baseInfo = super.getBookInfo();
        return `${baseInfo}, Розмір файлу: ${this.fileSize}MB`;
    }
}

class Library {
    #books = [];

    addBook(book) {
        if (book instanceof Book) {
            this.#books.push(book);
            console.log(`Книгу "${book.title}" успішно додано до бібліотеки.`);
        } else {
            console.error("Помилка: Можна додавати лише об'єкти типу Book або EBook.");
        }
    }
    listAllBooks() {
        console.log("\n--- Список усіх книг у бібліотеці ---");
        if (this.#books.length === 0) {
            console.log("Бібліотека порожня.");
            return;
        }
        this.#books.forEach(book => {
            console.log(book.getBookInfo());
        });
        console.log("------------------------------------");
    }

    get totalBooksCount() {
        return this.#books.length;
    }

    static generateLibraryId() {
        const randomPart = Math.random().toString(16).slice(2);
        return `LIB-${randomPart.toUpperCase()}`;
    }
}

const classicBook = new Book("1984", "Джордж Орвелл", 1949);
const anEBook = new EBook("Майстер і Маргарита", "Михайло Булгаков", 1967, 2.5);
const anotherEBook = new EBook("Дюна", "Френк Герберт", 1965, 4.1);

// бібліотеки
const myLibrary = new Library();


myLibrary.addBook(classicBook);
myLibrary.addBook(anEBook);
myLibrary.addBook(anotherEBook);
myLibrary.listAllBooks();
console.log(`\nЗагальна кількість книг у бібліотеці: ${myLibrary.totalBooksCount}`);

const libraryId = Library.generateLibraryId();
console.log(`\nID цієї бібліотеки: ${libraryId}`);

class Employee {
    constructor(name) {
        this.name = name;
    }

    work() {
        return `${this.name} dolgozik.`;
    }

    render() {
        const p = document.createElement("p");
        p.textContent = this.work();
        document.getElementById("oojs-app").appendChild(p);
    }
}

class Developer extends Employee {
    constructor(name, language) {
        super(name);
        this.language = language;
    }

    work() {
        return `${this.name}, a ${this.language} fejlesztő, kódot ír.`;
    }
}

class Manager extends Employee {
    constructor(name, department) {
        super(name);
        this.department = department;
    }

    work() {
        return `${this.name}, a(z) ${this.department} részleg vezetője, meetinget tart.`;
    }
}

const allEmployees = [
    new Developer("Ádám", "JavaScript"),
    new Manager("Petra", "HR"),
    new Developer("Zoltán", "Python"),
    new Manager("Krisztina", "Marketing")
];

allEmployees.forEach(employee => employee.render());

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* eslint-disable no-useless-concat */
/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-var */
/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import styles from './ListCrud.module.scss';
import { Modal } from '@fluentui/react';
import { getSP } from '../../../pnpjsconfig';
import * as React from 'react';
import * as dayjs from 'dayjs';
var myArray = [
    "Gryffindor",
    "Slytherin",
    "Ravenclaw",
    "Hufflepuff"
];
var ListCrud = function (props) {
    var LIST_NAME = 'Hogwart hat';
    var _sp = getSP(props.context);
    var _a = useState(''), email = _a[0], setEmail = _a[1];
    var _b = useState(''), name = _b[0], setName = _b[1];
    var _c = useState(''), house = _c[0], setHouse = _c[1];
    var _d = useState(Date), date = _d[0], setDate = _d[1];
    var _e = useState(false), isOpen = _e[0], setIsOpen = _e[1];
    var _f = useState(false), isOpen2 = _f[0], setIsOpen2 = _f[1];
    var _g = useState(false), isOpen3 = _g[0], setIsOpen3 = _g[1];
    var _h = useState([]), hatList = _h[0], setHatList = _h[1];
    var getCurrentUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _sp.web.currentUser()];
                case 1:
                    user = _a.sent();
                    setEmail(user.Email);
                    setName(user.Title);
                    return [2 /*return*/];
            }
        });
    }); };
    var getListItem = function () { return __awaiter(void 0, void 0, void 0, function () {
        var items, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    items = _sp.web.lists.getByTitle(LIST_NAME).items.select().orderBy('field_0', true).orderBy('Title', true)();
                    _a = setHatList;
                    return [4 /*yield*/, items];
                case 1:
                    _a.apply(void 0, [(_b.sent()).map(function (item) {
                            return {
                                Title: item.Title,
                                House: item.field_0,
                                Email: item.field_3,
                                DOB: item.field_2
                            };
                        })]);
                    return [2 /*return*/];
            }
        });
    }); };
    // const getLastestHouse = async () => {
    //   const lastestItem = _sp.web.lists.getByTitle(LIST_NAME).items.select().top(1).orderBy('ID', false)();
    //   var output: string[] = [];
    //   for (var i = 0; i < (await lastestItem).length; ++i)
    //     output = (await lastestItem)[i]['field_0']
    //   var house1 = output.toString()
    //   setHouse(house1)
    // }
    var checkUserHouse = function () { return __awaiter(void 0, void 0, void 0, function () {
        var items, output, i, _a, house1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    items = _sp.web.lists.getByTitle(LIST_NAME).items.select().filter("field_3 eq '".concat(email, "'")).getAll();
                    console.log("userlists", items);
                    output = [];
                    i = 0;
                    _b.label = 1;
                case 1:
                    _a = i;
                    return [4 /*yield*/, items];
                case 2:
                    if (!(_a < (_b.sent()).length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, items];
                case 3:
                    output = (_b.sent())[i]['field_0'];
                    _b.label = 4;
                case 4:
                    ++i;
                    return [3 /*break*/, 1];
                case 5:
                    house1 = output.toString();
                    setHouse(house1);
                    return [2 /*return*/];
            }
        });
    }); };
    var toggleModal = function () {
        if (isOpen === true) {
            setIsOpen(false);
        }
        else
            setIsOpen(true);
    };
    var toggleModal2 = function () {
        if (isOpen2 === true) {
            setIsOpen2(false);
        }
        else
            setIsOpen2(true);
    };
    var toggleModal3 = function () {
        if (isOpen3 === true) {
            setIsOpen3(false);
        }
        else
            setIsOpen3(true);
    };
    var createHouse = function () { return __awaiter(void 0, void 0, void 0, function () {
        var randomItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    randomItem = myArray[Math.floor(Math.random() * myArray.length)];
                    setDate(Date().toLocaleString());
                    if (!(house !== '')) return [3 /*break*/, 1];
                    toggleModal2();
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, _sp.web.lists.getByTitle(LIST_NAME).items.add({
                        Title: name,
                        field_0: randomItem,
                        field_2: dayjs(date).format('DD-MM-YYYYTHH:mm:ss'),
                        field_3: email
                    })];
                case 2:
                    _a.sent();
                    reRender();
                    setHouse(randomItem);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var randomHouse = function () { return __awaiter(void 0, void 0, void 0, function () {
        var randomItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    myArray = myArray.filter(function (item) {
                        return item !== house;
                    });
                    console.log(myArray);
                    if (!(myArray.length > 0 && house !== '')) return [3 /*break*/, 2];
                    randomItem = myArray[Math.floor(Math.random() * myArray.length)];
                    setHouse(randomItem);
                    return [4 /*yield*/, _sp.web.lists.getByTitle(LIST_NAME).items.add({
                            Title: name,
                            field_0: randomItem,
                            field_2: dayjs(date).format('DD-MM-YYYYTHH:mm:ss'),
                            field_3: email
                        })];
                case 1:
                    _a.sent();
                    reRender();
                    return [3 /*break*/, 3];
                case 2:
                    if (house === '') {
                        toggleModal();
                    }
                    else
                        toggleModal3();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var reRender = function () {
        getListItem();
    };
    useEffect(function () {
        getCurrentUser();
        checkUserHouse();
        getListItem();
        // getLastestHouse()
    }, [email]);
    // useEffect(() => {
    // }, [email])
    return (React.createElement("div", { className: styles.root },
        React.createElement("h2", null, "Current User Profile"),
        React.createElement("div", { className: styles.containerHeader },
            React.createElement("div", { className: styles.header },
                React.createElement("label", null, "Email: "),
                React.createElement("input", { type: "text", disabled: true, value: email })),
            React.createElement("div", { className: styles.header },
                React.createElement("label", null, "Full Name: "),
                React.createElement("input", { type: "text", disabled: true, value: name })),
            React.createElement("div", { className: styles.header },
                React.createElement("label", null, "House: "),
                React.createElement("input", { id: 'house', type: "text", disabled: true, value: house })),
            React.createElement("div", { className: styles.header },
                React.createElement("label", null, "Date/Time: "),
                React.createElement("input", { type: "text", disabled: true, value: date })),
            React.createElement("div", null,
                React.createElement("button", { type: 'submit', onClick: function () { return createHouse(); } }, "Sort"),
                React.createElement("button", { type: 'submit', onClick: function () { return randomHouse(); } }, "Sort Again")),
            React.createElement(Modal, { isOpen: isOpen, onDismiss: function () { return toggleModal(); } },
                React.createElement("h2", null, "Must click \"Sort\" button first")),
            React.createElement(Modal, { isOpen: isOpen2, onDismiss: function () { return toggleModal2(); } },
                React.createElement("h2", null, "Already have \"House\"")),
            React.createElement(Modal, { isOpen: isOpen3, onDismiss: function () { return toggleModal3(); } },
                React.createElement("h2", null, "Reload page to sort again"))),
        React.createElement("h2", null, "Tubular format"),
        React.createElement("div", { className: styles.container },
            React.createElement("table", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "House"),
                    React.createElement("th", null, "Email"),
                    React.createElement("th", null, "Full Name"),
                    React.createElement("th", null, "Date")),
                hatList.map(function (o, index) {
                    if (o.House === 'Gryffindor') {
                        return (React.createElement("tr", { className: styles.Gryffindor, key: index },
                            React.createElement("td", null, o.House),
                            React.createElement("td", null, o.Email),
                            React.createElement("td", null, o.Title),
                            React.createElement("td", null, o.DOB)));
                    }
                    if (o.House === 'Slytherin') {
                        return (React.createElement("tr", { className: styles.Slytherin, key: index },
                            React.createElement("td", null, o.House),
                            React.createElement("td", null, o.Email),
                            React.createElement("td", null, o.Title),
                            React.createElement("td", null, o.DOB)));
                    }
                    if (o.House === 'Ravenclaw') {
                        return (React.createElement("tr", { className: styles.Ravenclaw, key: index },
                            React.createElement("td", null, o.House),
                            React.createElement("td", null, o.Email),
                            React.createElement("td", null, o.Title),
                            React.createElement("td", null, o.DOB)));
                    }
                    if (o.House === 'Hufflepuff') {
                        return (React.createElement("tr", { className: styles.Hufflepuff, key: index },
                            React.createElement("td", null, o.House),
                            React.createElement("td", null, o.Email),
                            React.createElement("td", null, o.Title),
                            React.createElement("td", null, o.DOB)));
                    }
                })))));
};
export default ListCrud;
//# sourceMappingURL=ListCrud.js.map
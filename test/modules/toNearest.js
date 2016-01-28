if (typeof T === 'undefined') require('../setup');

(function () {
    T('toNearest');

    function isMinusZero(n) {
        return n.isZero() && n.isNegative();
    }

    Decimal.config({
        precision: 20,
        rounding: 4,
        toExpNeg: -9e15,
        toExpPos: 9e15,
        minE: -9e15,
        maxE: 9e15
    });

    var t = function (actual) {
        T.assert(actual);
    }

    t(!isMinusZero(new Decimal(0).toNearest(0)));
    t( isMinusZero(new Decimal(-1).toNearest(0)));
    t( isMinusZero(new Decimal(-0).toNearest(0)));
    t(!isMinusZero(new Decimal(1).toNearest(0)));
    t(!isMinusZero(new Decimal(1).toNearest(-0)));
    t(!isMinusZero(new Decimal(1).toNearest(-3)));
    t( isMinusZero(new Decimal(-1).toNearest(-3)));

    t = function (expected, n, v, sd, rm) {
        if (sd) Decimal.precision = sd;
        T.assertEqual(expected, new Decimal(n).toNearest(v, rm).valueOf());
    }

    t('Infinity', Infinity);
    t('-Infinity', -Infinity);
    t('NaN', NaN);
    t('NaN', NaN, NaN);
    t('NaN', NaN, Infinity);
    t('NaN', NaN, -Infinity);
    t('NaN', NaN, 0);
    t('NaN', NaN, -0);

    t('Infinity', '9.999e+9000000000000000', '1e+9000000000000001');
    t('Infinity', '9.999e+9000000000000000', '-1e+9000000000000001');
    t('-Infinity', '-9.999e+9000000000000000', '1e+9000000000000001');
    t('-Infinity', '-9.999e+9000000000000000', '-1e+9000000000000001');
    t('9.999e+9000000000000000', '9.999e+9000000000000000');
    t('-9.999e+9000000000000000', '-9.999e+9000000000000000');

    t('NaN', 123.456, NaN);
    t('Infinity', 123.456, Infinity);
    t('Infinity', 123.456, -Infinity);
    t('0', 123.456, 0);
    t('0', 123.456, '-0');

    t('NaN', -123.456, NaN);
    t('-Infinity', -123.456, Infinity);
    t('-Infinity', -123.456, -Infinity);
    t('-0', -123.456, '-0');

    t('0', 0, 0);
    t('Infinity', 0, Infinity);
    t('Infinity', 0, -Infinity);
    t('-Infinity', -0, Infinity);
    t('-Infinity', -0, -Infinity);

    t('0', 1, -3);
    t('-0', -1, -3);
    t('3', 1.5, -3, 20, 0);
    t('-0', -1.5, -3, 20, 1);
    t('-3', -1.5, -3, 20, 2);

    t('123', 123.456);
    t('123', 123.456, 1);
    t('123.5', 123.456, 0.1);
    t('123.46', 123.456, 0.01);
    t('123.456', 123.456, 0.001);

    t('123', 123.456, -1);
    t('123.5', 123.456, -0.1);
    t('123.46', 123.456, -0.01);
    t('123.456', 123.456, -0.001);

    t('124', 123.456, '-2');
    t('123.4', 123.456, '-0.2');
    t('123.46', 123.456, '-0.02');
    t('123.456', 123.456, '-0.002');

    t('83105511540', '83105511539.5', 1, 11, 4);
    t('83105511539', '83105511539.499999999999999999999999999999', 1, 11, 4);
    t('83105511539', '83105511539.5', '1', 11, 5);
    t('83105511540', '83105511539.5000000000000000000001', 1, 11, 5);

    t('83105511540', '83105511539.5', new Decimal(1), 3, 4);
    t('83105511539', '83105511539.499999999999999999999999999999', 1, 3, 4);
    t('83105511539', '83105511539.5', new Decimal('1'), 3, 5);
    t('83105511540', '83105511539.5000000000000000000001', 1, 3, 5);

    t('83105511540', '83105511539.5', Decimal.ONE, 30, 4);
    t('83105511539', '83105511539.499999999999999999999999999999', 1, 30, 4);
    t('83105511539', '83105511539.5', 1, 30, 5);
    t('83105511540', '83105511539.5000000000000000000001', 1, 30, 5);

    t('83105511540', '83105511539.5', -1, 11, 4);
    t('83105511539', '83105511539.499999999999999999999999999999', -1, 11, 4);
    t('83105511539', '83105511539.5', '-1', 11, 5);
    t('83105511540', '83105511539.5000000000000000000001', -1, 11, 5);

    t('83105511540', '83105511539.5', new Decimal(-1), 3, 4);
    t('83105511539', '83105511539.499999999999999999999999999999', 1, 3, 4);
    t('83105511539', '83105511539.5', new Decimal('-1'), 3, 5);
    t('83105511540', '83105511539.5000000000000000000001', -1, 3, 5);

    t('83105511540', '83105511539.5', 1, 30, 0);
    t('83105511539', '83105511539.5', 1, 30, 1);
    t('83105511540', '83105511539.5', 1, 30, 2);
    t('83105511539', '83105511539.5', 1, 30, 3);
    t('83105511540', '83105511539.5', 1, 30, 4);
    t('83105511539', '83105511539.5', 1, 30, 5);
    t('83105511540', '83105511539.5', 1, 30, 6);
    t('83105511540', '83105511539.5', 1, 30, 7);
    t('83105511539', '83105511539.5', 1, 30, 8);
    t('83105511539', '83105511539.499999999999999999999999999999', void 0, 30, 0);
    t('83105511539', '83105511539.499999999999999999999999999999', 1, 30, 1);
    t('83105511539', '83105511539.499999999999999999999999999999', void 0, 30, 2);
    t('83105511539', '83105511539.499999999999999999999999999999', 1, 30, 3);
    t('83105511539', '83105511539.499999999999999999999999999999', void 0, 30, 4);
    t('83105511539', '83105511539.499999999999999999999999999999', 1, 30, 5);
    t('83105511539', '83105511539.499999999999999999999999999999', void 0, 30, 6);
    t('83105511539', '83105511539.499999999999999999999999999999', 1, 30, 7);
    t('83105511539', '83105511539.499999999999999999999999999999', void 0, 30, 8);
    t('83105511540', '83105511539.5000000000000000000001', void 0, 30, 0);
    t('83105511540', '83105511539.5000000000000000000001', 1, 30, 1);
    t('83105511540', '83105511539.5000000000000000000001', void 0, 30, 2);
    t('83105511540', '83105511539.5000000000000000000001', 1, 30, 3);
    t('83105511540', '83105511539.5000000000000000000001', void 0, 30, 4);
    t('83105511540', '83105511539.5000000000000000000001', 1, 30, 5);
    t('83105511540', '83105511539.5000000000000000000001', void 0, 30, 6);
    t('83105511540', '83105511539.5000000000000000000001', 1, 30, 7);
    t('83105511540', '83105511539.5000000000000000000001', void 0, 30, 8);

    Decimal.rounding = 0;
    t('83105511540', '83105511539.5', void 0, 11);

    Decimal.rounding = 1;
    t('83105511539', '83105511539.5', void 0, 11);

    t('3847560', '3847561.00000749', 10, 11, 0);
    t('42840000000000000', '42835000000000001', '1e+13', 2, 0);
    t('42840000000000000', '42835000000000001', '1e+13', 2, 1);
    t('42840000000000000', '42835000000000000.0002', '1e+13', 200, 0);
    t('42840000000000000', '42835000000000000.0002', '1e+13', 200, 1);

    T.stop();
})();
(this["webpackJsonpmaterial-table-remote-demo"] =
  this["webpackJsonpmaterial-table-remote-demo"] || []).push([
  [0],
  {
    448: function (e, t, a) {},
    449: function (e, t, a) {
      "use strict";
      a.r(t);
      var n,
        r = a(12),
        c = a(485),
        i = a(0),
        o = a.n(i),
        s = a(15),
        l = a.n(s),
        u = a(32),
        d = (a(371), a(308)),
        b = a(474),
        j = a(484),
        f = a(298),
        p = a(115),
        m = a(299),
        O = Object(f.a)({
          palette: { primary: p.a, secondary: m.a },
          typography: { fontSize: 14 },
        }),
        x = a(309),
        h = a(142),
        g = a(22),
        v = a(348),
        w = a(63),
        P = a.n(w),
        y = a(100),
        S = a(87),
        k = a(237),
        R = a.n(k),
        C = function (e) {
          return new Promise(
            (function () {
              var t = Object(y.a)(
                P.a.mark(function t(a, n) {
                  var r, c, i, o, s, l;
                  return P.a.wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (t.prev = 0),
                              (r = "https://reqres.in/api/users"),
                              (r += "?per_page=" + e.pageSize),
                              (r += "&page=" + (e.page + 1)),
                              (t.next = 6),
                              R.a.get(r)
                            );
                          case 6:
                            (c = t.sent),
                              (i = c.data),
                              (o = i.data),
                              (s = i.page),
                              (l = i.total),
                              a({ data: o, page: s - 1, totalCount: l }),
                              (t.next = 14);
                            break;
                          case 11:
                            (t.prev = 11), (t.t0 = t.catch(0)), n(t.t0);
                          case 14:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    null,
                    [[0, 11]]
                  );
                })
              );
              return function (e, a) {
                return t.apply(this, arguments);
              };
            })()
          );
        },
        D = Object(S.b)(
          "table/processNewPage",
          (function () {
            var e = Object(y.a)(
              P.a.mark(function e(t, a) {
                var n, r, c, i, o, s;
                return P.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (
                          ((n = a.dispatch),
                          (r = a.getState),
                          (c = r().table.preloadDetails),
                          (i = r().table.items),
                          !c)
                        ) {
                          e.next = 9;
                          break;
                        }
                        return (e.next = 6), t;
                      case 6:
                        (o = e.sent),
                          (s = o.data),
                          new Promise(
                            Object(y.a)(
                              P.a.mark(function e() {
                                var t, a, r, c;
                                return P.a.wrap(
                                  function (e) {
                                    for (;;)
                                      switch ((e.prev = e.next)) {
                                        case 0:
                                          (t = Object(v.a)(s)),
                                            (e.prev = 1),
                                            t.s();
                                        case 3:
                                          if ((a = t.n()).done) {
                                            e.next = 12;
                                            break;
                                          }
                                          if (
                                            ((r = a.value), (c = r.id), i[c])
                                          ) {
                                            e.next = 10;
                                            break;
                                          }
                                          return (
                                            n(I(c)),
                                            (e.next = 10),
                                            new Promise(function (e) {
                                              return setTimeout(e, 125);
                                            })
                                          );
                                        case 10:
                                          e.next = 3;
                                          break;
                                        case 12:
                                          e.next = 17;
                                          break;
                                        case 14:
                                          (e.prev = 14),
                                            (e.t0 = e.catch(1)),
                                            t.e(e.t0);
                                        case 17:
                                          return (
                                            (e.prev = 17), t.f(), e.finish(17)
                                          );
                                        case 20:
                                        case "end":
                                          return e.stop();
                                      }
                                  },
                                  e,
                                  null,
                                  [[1, 14, 17, 20]]
                                );
                              })
                            )
                          );
                      case 9:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (t, a) {
              return e.apply(this, arguments);
            };
          })()
        ),
        I = Object(S.b)(
          "details/fetchById",
          (function () {
            var e = Object(y.a)(
              P.a.mark(function e(t) {
                var a, n, r, c, i, o, s, l;
                return P.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.next = 2),
                          R.a.get("https://reqres.in/api/users/".concat(t))
                        );
                      case 2:
                        return (
                          (a = e.sent),
                          (n = a.data.data),
                          (r = n.avatar),
                          (c = n.email),
                          (i = n.first_name),
                          (o = n.last_name),
                          (s = r),
                          (l = ""
                            .concat(i, " ")
                            .concat(o, "\n")
                            .concat(
                              c,
                              "\n \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Integer purus justo, dignissim ut efficitur sit amet, mollis quis libero. Vivamus quis magna volutpat, commodo elit id, aliquet massa. Quisque congue felis eget diam ultricies, ultricies suscipit felis aliquam. Integer ullamcorper volutpat semper. Curabitur a mauris ornare, facilisis odio eget, mollis elit. Nam molestie erat ac quam scelerisque iaculis. Quisque ac felis auctor, viverra orci eget, dignissim metus.\n"
                            )),
                          e.abrupt("return", { id: t, icon: s, description: l })
                        );
                      case 7:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (t) {
              return e.apply(this, arguments);
            };
          })()
        ),
        N = Object(S.c)({
          name: "table",
          initialState: {
            maxSaved: 100,
            recentItems: [],
            items: {},
            maxOpenPanels: 1,
            openPanels: [],
            pageSize: 10,
            preloadDetails: !1,
            currentPageIds: [],
          },
          reducers: {
            registerItemHit: function (e, t) {
              var a = t.payload,
                n = e.recentItems.indexOf(a);
              for (
                n > -1 && e.recentItems.splice(n, 1), e.recentItems.push(a);
                e.recentItems.length > e.maxSaved;

              ) {
                var r = e.recentItems.shift();
                delete e.items[r];
              }
            },
            setPanelStateOpen: function (e, t) {
              var a = t.payload,
                n = e.openPanels.indexOf(a);
              for (
                n > -1 && e.openPanels.splice(n, 1), e.openPanels.push(a);
                e.openPanels.length > e.maxOpenPanels;

              )
                e.openPanels.shift();
            },
            setPanelStateClosed: function (e, t) {
              var a = t.payload,
                n = e.openPanels.indexOf(a);
              n > -1 && e.openPanels.splice(n, 1);
            },
            setPanelStateAllClosed: function (e) {
              e.openPanels = [];
            },
            setPageSize: function (e, t) {
              e.pageSize = t.payload;
            },
            togglePreload: function (e) {
              e.preloadDetails = !e.preloadDetails;
            },
          },
          extraReducers:
            ((n = {}),
            Object(h.a)(n, I.pending, function (e, t) {
              var a = t.meta.arg;
              e.items[a] = Object(g.a)({ status: "Pending" }, e.items[a]);
            }),
            Object(h.a)(n, I.fulfilled, function (e, t) {
              var a = t.payload.id;
              e.items[a] = Object(g.a)({ status: "Cached" }, t.payload);
            }),
            n),
        }),
        H = N.actions,
        q = H.registerItemHit,
        z = H.setPanelStateOpen,
        M = H.setPanelStateClosed,
        T = H.setPanelStateAllClosed,
        W = H.setPageSize,
        F = H.togglePreload,
        U = N.reducer,
        _ = Object(S.c)({
          name: "debug",
          initialState: { count: 0 },
          reducers: {
            increment: function (e) {
              e.count += 1;
            },
            decrement: function (e) {
              e.count -= 1;
            },
          },
        }),
        A = _.actions,
        B = A.increment,
        L = A.decrement,
        E = _.reducer,
        J = Object(d.a)(function (e) {
          return { button: { margin: e.spacing(2) } };
        });
      var Q = function () {
          var e = J(),
            t = Object(u.c)(),
            a = Object(u.d)(function (e) {
              return e.debug.count;
            }),
            n = Object(u.d)(function (e) {
              return e.table.preloadDetails;
            });
          return Object(r.jsxs)(r.Fragment, {
            children: [
              Object(r.jsx)("span", { children: a }),
              Object(r.jsx)(x.a, {
                variant: "contained",
                className: e.button,
                color: "primary",
                onClick: function () {
                  return t(B());
                },
                children: "Increment",
              }),
              Object(r.jsx)(x.a, {
                variant: "contained",
                className: e.button,
                color: "secondary",
                onClick: function () {
                  return t(L());
                },
                children: "Decrement",
              }),
              Object(r.jsxs)("span", {
                children: ["Preload: ", n ? "True" : "False"],
              }),
              Object(r.jsx)(x.a, {
                variant: "contained",
                className: e.button,
                color: "primary",
                onClick: function () {
                  return t(F());
                },
                children: "Toggle Preload",
              }),
            ],
          });
        },
        V = a(88),
        Y = a(230),
        $ = a.n(Y),
        G = a(486),
        K = a(487),
        X = a(488),
        Z = a(489),
        ee = a(490),
        te = a(491),
        ae = a(492),
        ne = a(493),
        re = a(494),
        ce = a(495),
        ie = {
          DetailPanel: Object(i.forwardRef)(function (e, t) {
            return Object(r.jsx)(
              G.a,
              Object(g.a)(Object(g.a)({}, e), {}, { ref: t })
            );
          }),
          FirstPage: Object(i.forwardRef)(function (e, t) {
            return Object(r.jsx)(
              K.a,
              Object(g.a)(Object(g.a)({}, e), {}, { ref: t })
            );
          }),
          LastPage: Object(i.forwardRef)(function (e, t) {
            return Object(r.jsx)(
              X.a,
              Object(g.a)(Object(g.a)({}, e), {}, { ref: t })
            );
          }),
          NextPage: Object(i.forwardRef)(function (e, t) {
            return Object(r.jsx)(
              G.a,
              Object(g.a)(Object(g.a)({}, e), {}, { ref: t })
            );
          }),
          PreviousPage: Object(i.forwardRef)(function (e, t) {
            return Object(r.jsx)(
              Z.a,
              Object(g.a)(Object(g.a)({}, e), {}, { ref: t })
            );
          }),
          ResetSearch: Object(i.forwardRef)(function (e, t) {
            return Object(r.jsx)(
              ee.a,
              Object(g.a)(Object(g.a)({}, e), {}, { ref: t })
            );
          }),
          Search: Object(i.forwardRef)(function (e, t) {
            return Object(r.jsx)(
              te.a,
              Object(g.a)(Object(g.a)({}, e), {}, { ref: t })
            );
          }),
          SortArrow: Object(i.forwardRef)(function (e, t) {
            return Object(r.jsx)(
              ae.a,
              Object(g.a)(Object(g.a)({}, e), {}, { ref: t })
            );
          }),
          Retry: Object(i.forwardRef)(function (e, t) {
            return Object(r.jsx)(
              ne.a,
              Object(g.a)(Object(g.a)({}, e), {}, { ref: t })
            );
          }),
          SpamUnset: Object(i.forwardRef)(function (e, t) {
            return Object(r.jsx)(
              re.a,
              Object(g.a)(Object(g.a)({ color: "disabled" }, e), {}, { ref: t })
            );
          }),
          SpamSet: Object(i.forwardRef)(function (e, t) {
            return Object(r.jsx)(
              re.a,
              Object(g.a)(Object(g.a)({ color: "primary" }, e), {}, { ref: t })
            );
          }),
          HamUnset: Object(i.forwardRef)(function (e, t) {
            return Object(r.jsx)(
              ce.a,
              Object(g.a)(Object(g.a)({ color: "disabled" }, e), {}, { ref: t })
            );
          }),
          HamSet: Object(i.forwardRef)(function (e, t) {
            return Object(r.jsx)(
              ce.a,
              Object(g.a)(Object(g.a)({ color: "primary" }, e), {}, { ref: t })
            );
          }),
        },
        oe = a(478),
        se = a(481),
        le = a(482),
        ue = a(483),
        de = Object(d.a)(function (e) {
          return {
            panelRoot: {
              backgroundColor: e.palette.grey[50],
              maxHeight: "300px",
              overflowY: "scroll",
              padding: e.spacing(2),
            },
            cardRoot: { display: "flex", alignItems: "center" },
            cardContent: { flex: "1 1 auto" },
            cardText: { overflowWrap: "break-word" },
            cardIcon: {
              flex: "1 0 auto",
              width: 80,
              height: 80,
              maxHeight: 80,
              maxWidth: 80,
              margin: e.spacing(1),
            },
          };
        });
      function be(e) {
        var t = e.rowData,
          a = e.closeRowPanel,
          n = t.id,
          c = t.tableData.id,
          o = de(),
          s = Object(u.d)(function (e) {
            return e.table.items[n];
          }),
          l = Object(u.d)(function (e) {
            return e.table.openPanels.indexOf(c) > -1;
          });
        Object(i.useEffect)(function () {
          (s && l) || a(t);
        });
        var d = "Loading...",
          b = "/apple-touch-icon.png";
        "Cached" === (null === s || void 0 === s ? void 0 : s.status) &&
          ((d = s.description), (b = s.icon));
        var j = d.replace(/(\s*\r?\n\r?){4,}/g, "\n\n\n").split(/\r?\n\r?/);
        return Object(r.jsx)(oe.a, {
          container: !0,
          justify: "center",
          className: o.panelRoot,
          children: Object(r.jsx)(oe.a, {
            item: !0,
            xs: 12,
            children: Object(r.jsxs)(se.a, {
              className: o.cardRoot,
              children: [
                Object(r.jsx)(le.a, {
                  className: o.cardContent,
                  children: Object(r.jsx)(V.a, {
                    variant: "body2",
                    component: "div",
                    children: j.map(function (e, t) {
                      return Object(r.jsxs)(
                        "div",
                        {
                          className: o.cardText,
                          children: [e, Object(r.jsx)("br", {})],
                        },
                        t
                      );
                    }),
                  }),
                }),
                Object(r.jsx)(ue.a, {
                  className: o.cardIcon,
                  image: b,
                  title: "Icon",
                }),
              ],
            }),
          }),
        });
      }
      a(448);
      var je = Object(d.a)(function (e) {
        return {
          actionHeader: {
            width: "120px",
            display: "flex",
            justifyContent: "space-evenly",
          },
        };
      });
      var fe = function () {
          var e = je(),
            t = Object(u.c)(),
            a = Object(i.useRef)(null),
            n = Object(u.d)(function (e) {
              return e.table.items;
            }),
            c = Object(u.d)(function (e) {
              return e.table.openPanels;
            }),
            o = Object(u.d)(function (e) {
              return e.table.pageSize;
            }),
            s = [
              {
                title: "ID",
                field: "id",
                cellStyle: { width: "50px" },
                width: null,
              },
              { title: "Name", field: "first_name" },
              {
                title: "Status",
                field: "status",
                align: "center",
                cellStyle: { width: "120px" },
                render: function (e) {
                  return Object(r.jsx)("span", { children: "[Debug]" });
                },
              },
              {
                title: "Prediction",
                field: "prediction",
                align: "center",
                cellStyle: { width: "120px" },
                render: function (e) {
                  return (
                    (e.prediction = (100 * Math.random()).toFixed(2)),
                    e.prediction > 50
                      ? Object(r.jsx)(V.a, {
                          variant: "body2",
                          color: "primary",
                          children: Object(r.jsx)("b", {
                            children: "".concat(e.prediction, "%"),
                          }),
                        })
                      : Object(r.jsx)(V.a, {
                          variant: "body2",
                          color: "textSecondary",
                          children: "".concat(e.prediction, "%"),
                        })
                  );
                },
              },
            ],
            l = function (e) {
              var n = e.tableData.id;
              e.tableData.showDetailPanel &&
                a.current.onToggleDetailPanel([n], a.current.props.detailPanel),
                t(M(n));
            };
          return Object(r.jsx)("div", {
            className: "main-table",
            children: Object(r.jsx)($.a, {
              tableRef: a,
              icons: ie,
              columns: s,
              data: (function () {
                var e = Object(y.a)(
                  P.a.mark(function e(a) {
                    var n;
                    return P.a.wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (n = C(a)), t(D(n)), e.abrupt("return", n);
                          case 3:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })(),
              title: "Material-Table Remote Data Demo",
              detailPanel: function (e) {
                return Object(r.jsx)(be, { rowData: e, closeRowPanel: l });
              },
              onRowClick: function (e, a, r) {
                !(function (e, a) {
                  var r = e.id,
                    i = e.tableData.id,
                    o = n[r],
                    s = c.indexOf(i) > -1,
                    l = e.tableData.showDetailPanel;
                  s
                    ? (l && a(), t(M(e.tableData.id)))
                    : (o
                        ? "Cached" === o.status && t(q(r))
                        : (t(q(r)), t(I(r))),
                      l || a(),
                      t(z(e.tableData.id)));
                })(a, r);
              },
              onChangePage: function (e, a) {
                t(T()), t(W(a));
              },
              options: {
                actionsCellStyle: {
                  width: "120px",
                  justifyContent: "space-evenly",
                },
                actionsColumnIndex: -1,
                rowStyle: {},
                pageSize: o,
              },
              actions: [
                function (e) {
                  return {
                    icon: "1" === e.label ? ie.HamSet : ie.HamUnset,
                    tooltip: "1" === e.label ? "Marked as Ham" : "Mark as Ham",
                    onClick: function (e, a) {
                      "1" !== a.label && t(B());
                    },
                  };
                },
                function (e) {
                  return {
                    icon: "-1" === e.label ? ie.SpamSet : ie.SpamUnset,
                    tooltip:
                      "-1" === e.label ? "Marked as Spam" : "Mark as Spam",
                    onClick: function (e, a) {
                      "-1" !== a.label && t(L());
                    },
                  };
                },
              ],
              localization: {
                header: {
                  actions: Object(r.jsxs)("div", {
                    className: e.actionHeader,
                    children: [
                      Object(r.jsx)("div", { children: "Ham" }),
                      Object(r.jsx)("div", { children: "/" }),
                      Object(r.jsx)("div", { children: "Spam" }),
                    ],
                  }),
                },
              },
            }),
          });
        },
        pe = Object(d.a)(function (e) {
          return { root: { padding: e.spacing(6) } };
        });
      var me = function () {
          var e = pe();
          return Object(r.jsx)(b.a, {
            theme: O,
            children: Object(r.jsxs)(j.a, {
              maxWidth: "xl",
              className: e.root,
              children: [Object(r.jsx)(fe, {}), Object(r.jsx)(Q, {})],
            }),
          });
        },
        Oe = Object(S.a)({ reducer: { table: U, debug: E } });
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      );
      l.a.render(
        Object(r.jsx)(o.a.StrictMode, {
          children: Object(r.jsxs)(u.a, {
            store: Oe,
            children: [Object(r.jsx)(c.a, {}), Object(r.jsx)(me, {})],
          }),
        }),
        document.getElementById("root")
      ),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready.then(function (e) {
            e.unregister();
          });
    },
  },
  [[449, 1, 2]],
]);
//# sourceMappingURL=main.7a3e710d.chunk.js.map

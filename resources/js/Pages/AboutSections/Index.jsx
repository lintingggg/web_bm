import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Plus, 
    Pencil, 
    Trash2, 
    Check, 
    X,
    Image as ImageIcon,
    CheckCircle2,
    XCircle
} from 'lucide-react';

function ErrorText({ message }) {
    if (!message) return null;
    return <p className="mt-1 text-xs text-rose-500">{message}</p>;
}

const defaultData = {
    title: '',
    title_line2: '',
    description: '',
    primary_image: null,
    secondary_image: null,
    is_active: false,
};

export default function AboutSectionsIndex({ aboutSections, stats }) {
    const [editingItem, setEditingItem] = useState(null);

    const form = useForm(defaultData);

    const submit = (event) => {
        event.preventDefault();

        if (editingItem) {
            form.transform((data) => {
                const formData = { ...data, _method: 'put' };
                if (formData.primary_image === null) {
                    delete formData.primary_image;
                }
                if (formData.secondary_image === null) {
                    delete formData.secondary_image;
                }
                formData.is_active = formData.is_active ? 1 : 0;
                return formData;
            });
            form.post(route('about-sections.update', editingItem.id), {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => {
                    form.reset();
                    form.setData('is_active', false);
                    setEditingItem(null);
                },
            });
            return;
        }

        form.transform((data) => {
            const formData = { ...data };
            formData.is_active = formData.is_active ? 1 : 0;
            return formData;
        });
        form.post(route('about-sections.store'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                form.reset();
                form.setData('is_active', false);
            },
        });
    };

    const editItem = (item) => {
        setEditingItem(item);
        form.setData({
            title: item.title,
            title_line2: item.title_line2,
            description: item.description,
            primary_image: null,
            secondary_image: null,
            is_active: item.is_active,
        });
        form.clearErrors();
    };

    const deleteItem = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            router.delete(route('about-sections.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const toggleActive = (item) => {
        router.put(route('about-sections.update', item.id), {
            _method: 'put',
            title: item.title,
            title_line2: item.title_line2,
            description: item.description,
            is_active: !item.is_active ? 1 : 0,
        }, {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-neutral-800 dark:text-neutral-200">Kelola Tentang Kami (About)</h2>}
        >
            <Head title="Tentang Kami - Admin" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Stats */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-surface-base">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-neutral-100 p-3 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                    <ImageIcon size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                        Total Data
                                    </p>
                                    <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                                        {stats.total}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-surface-base">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                        Aktif Tampil
                                    </p>
                                    <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                                        {stats.active}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-surface-base">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-rose-50 p-3 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                                    <XCircle size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                        Tidak Aktif
                                    </p>
                                    <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                                        {stats.inactive}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Form Component */}
                        <div className="lg:col-span-1">
                            <form
                                onSubmit={submit}
                                className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-surface-base"
                            >
                                <div className="border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
                                    <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                                        {editingItem ? 'Edit Konten' : 'Tambah Konten Baru'}
                                    </h3>
                                </div>

                                <div className="flex flex-col gap-4 p-6">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            Teks Judul (Atas)
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.title}
                                            onChange={(e) => form.setData('title', e.target.value)}
                                            className="w-full rounded-lg border-neutral-300 bg-white text-sm focus:border-accent-orange focus:ring-accent-orange dark:border-neutral-700 dark:bg-surface-muted dark:text-white"
                                            placeholder="Contoh: Tentang Kami"
                                            required
                                        />
                                        <ErrorText message={form.errors.title} />
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            Teks Judul (Bawah)
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.title_line2}
                                            onChange={(e) => form.setData('title_line2', e.target.value)}
                                            className="w-full rounded-lg border-neutral-300 bg-white text-sm focus:border-accent-orange focus:ring-accent-orange dark:border-neutral-700 dark:bg-surface-muted dark:text-white"
                                            placeholder="Contoh: Karya & Karsa."
                                            required
                                        />
                                        <ErrorText message={form.errors.title_line2} />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            Deskripsi
                                        </label>
                                        <textarea
                                            value={form.data.description}
                                            onChange={(e) => form.setData('description', e.target.value)}
                                            className="w-full rounded-lg border-neutral-300 bg-white text-sm focus:border-accent-orange focus:ring-accent-orange dark:border-neutral-700 dark:bg-surface-muted dark:text-white min-h-[100px]"
                                            placeholder="Deskripsi singkat tentang ukm..."
                                            required
                                        />
                                        <ErrorText message={form.errors.description} />
                                    </div>

                                    {/* Primary Image */}
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            Gambar Utama (Kotak Atas) {editingItem && '(Kosongkan jika tidak diubah)'}
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            onChange={(e) => form.setData('primary_image', e.target.files[0])}
                                            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-700 file:mr-4 file:rounded-md file:border-0 file:bg-neutral-100 file:px-4 file:py-2 file:text-sm file:font-medium hover:file:bg-neutral-200 focus:border-accent-orange focus:outline-none focus:ring-1 focus:ring-accent-orange dark:border-neutral-700 dark:bg-surface-muted dark:text-neutral-300 dark:file:bg-neutral-800 dark:file:text-neutral-300 hover:dark:file:bg-neutral-700"
                                        />
                                        <ErrorText message={form.errors.primary_image} />
                                        {editingItem?.primary_image_url && (
                                            <div className="mt-2">
                                                <p className="mb-1 text-xs text-neutral-500">Gambar Saat Ini:</p>
                                                <img src={editingItem.primary_image_url} alt="Primary" className="h-20 w-auto rounded border" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Secondary Image */}
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            Gambar Kedua (Kotak Bawah) {editingItem && '(Kosongkan jika tidak diubah)'}
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            onChange={(e) => form.setData('secondary_image', e.target.files[0])}
                                            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-700 file:mr-4 file:rounded-md file:border-0 file:bg-neutral-100 file:px-4 file:py-2 file:text-sm file:font-medium hover:file:bg-neutral-200 focus:border-accent-orange focus:outline-none focus:ring-1 focus:ring-accent-orange dark:border-neutral-700 dark:bg-surface-muted dark:text-neutral-300 dark:file:bg-neutral-800 dark:file:text-neutral-300 hover:dark:file:bg-neutral-700"
                                        />
                                        <ErrorText message={form.errors.secondary_image} />
                                        {editingItem?.secondary_image_url && (
                                            <div className="mt-2">
                                                <p className="mb-1 text-xs text-neutral-500">Gambar Saat Ini:</p>
                                                <img src={editingItem.secondary_image_url} alt="Secondary" className="h-20 w-auto rounded border" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="is_active"
                                            checked={form.data.is_active}
                                            onChange={(e) => form.setData('is_active', e.target.checked)}
                                            className="rounded border-neutral-300 text-accent-orange focus:ring-accent-orange dark:border-neutral-700 dark:bg-surface-muted dark:checked:bg-accent-orange"
                                        />
                                        <label htmlFor="is_active" className="text-sm text-neutral-700 dark:text-neutral-300">
                                            Aktifkan / Tampilkan di halaman depan?
                                        </label>
                                        <ErrorText message={form.errors.is_active} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-3 border-t border-neutral-200 px-6 py-4 dark:border-neutral-800">
                                    {editingItem && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditingItem(null);
                                                form.reset();
                                                form.clearErrors();
                                            }}
                                            className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                                        >
                                            Batal
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={form.processing}
                                        className="inline-flex items-center gap-2 rounded-lg bg-accent-orange px-4 py-2 text-sm font-medium text-white hover:bg-accent-orange/90 disabled:opacity-50"
                                    >
                                        {form.processing ? (
                                            'Menyimpan...'
                                        ) : (
                                            <>
                                                <Plus size={16} />
                                                {editingItem ? 'Simpan Perubahan' : 'Tambah Konten'}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Data List */}
                        <div className="lg:col-span-2">
                            <div className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-surface-base overflow-hidden">
                                <div className="border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
                                    <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                                        Daftar Konten About
                                    </h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-400">
                                        <thead className="bg-neutral-50 text-neutral-900 dark:bg-surface-muted dark:text-neutral-100">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">Gambar Utama</th>
                                                <th className="px-6 py-4 font-medium">Gambar Kedua</th>
                                                <th className="px-6 py-4 font-medium">Teks</th>
                                                <th className="px-6 py-4 font-medium text-center">Status</th>
                                                <th className="px-6 py-4 font-medium text-right">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                                            {aboutSections.length === 0 ? (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-8 text-center text-neutral-500">
                                                        Belum ada data About Section.
                                                    </td>
                                                </tr>
                                            ) : (
                                                aboutSections.map((item) => (
                                                    <tr key={item.id} className="hover:bg-neutral-50 dark:hover:bg-surface-muted/50">
                                                        <td className="px-6 py-4">
                                                            {item.primary_image_url ? (
                                                                <img src={item.primary_image_url} alt="Primary" className="h-16 w-16 object-cover rounded shadow-sm" />
                                                            ) : (
                                                                <span className="text-xs text-neutral-400">Tidak ada</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {item.secondary_image_url ? (
                                                                <img src={item.secondary_image_url} alt="Secondary" className="h-16 w-16 object-cover rounded shadow-sm" />
                                                            ) : (
                                                                <span className="text-xs text-neutral-400">Tidak ada</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <p className="font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</p>
                                                            <p className="text-xs">{item.title_line2}</p>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <button
                                                                onClick={() => toggleActive(item)}
                                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                                                                    item.is_active
                                                                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400'
                                                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400'
                                                                }`}
                                                            >
                                                                {item.is_active ? (
                                                                    <><Check size={14} /> Aktif</>
                                                                ) : (
                                                                    <><X size={14} /> Tdk Aktif</>
                                                                )}
                                                            </button>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <button
                                                                    onClick={() => editItem(item)}
                                                                    className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-accent-orange dark:hover:bg-neutral-800"
                                                                    title="Edit"
                                                                >
                                                                    <Pencil size={18} />
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteItem(item.id)}
                                                                    className="rounded-lg p-2 text-neutral-400 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-500/10"
                                                                    title="Hapus"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
